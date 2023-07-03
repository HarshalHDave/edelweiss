import { EventEmitter } from 'stream'
import { Worker } from 'worker_threads'
import './types'

// Calculator
import { formatDate, optionsCalculation } from './lib/optionsCalculations'

// Config
import { get_stream_host, get_stream_port } from './lib/utils'

// Utils
import { split_at_number } from './lib/utils'

import logger from './lib/logger'

const months = 'JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC'.split(', ')

class App extends EventEmitter {
	#listeners: Array<{
		view: View
		opts: ViewOptions
		callback: (data: any) => void
	}> = []

	companies: Array<Company> = []
	companies_snapshot: Array<Company> = []

	constructor() {
		super()

		const worker = new Worker('./src/worker.js', {
			workerData: {
				host: get_stream_host(),
				port: get_stream_port()
			}
		})

		worker.on('online', () => {
			logger.info('Worker is live')
		})

		worker.on('message', (data) => {
			// logger.debug('Worker sent', { msg: data })
			this.#receive(data)
		})

		setInterval(this.#resolve, 2000)
	}

	#resolve() {
		this.#listeners.forEach((listener) => {
			const view = this.get(listener.view, listener.opts)
			listener.callback(view)
		})
	}

	#scheduled_update() {
		this.#listeners.forEach((listener) => {
			const view = this.get(listener.view, listener.opts)
			listener.callback(view)
		})
	}

	#receive(data: { trading_symbol: string; market_data: MarketData }) {
		const { trading_symbol, market_data } = data

		const [name, options] = split_at_number(trading_symbol)

		let company = this.companies.find((c) => c.name == name)
		let created_company = false
		if (!company) {
			created_company = true
			company = {
				name,
				market_data: [],
				options: [],
				futures: []
			}
		}

		if (options == '') {
			// No options data is present
			// So the market data we received belongs to the company (spot data)
			company.market_data.push(market_data)
			if (created_company) this.companies.push(company)
			return
		}

		// Options data is present
		// We will first process the options data
		const { type, expiry_date, strike } = this.#parseOptionsStr(options)
		// const id = name + expiry_date + strike
		let id = name + options
		id = id.substring(0, id.length - 2)

		// For future options
		if (type == 'fut') {
			let future = company.futures.find((f) => f.id == id)
			let created_future = false
			if (!future) {
				created_future = true
				future = {
					id,
					expiry_date,
					strike: strike!,
					market_data: []
				}
			}

			future.market_data.push(market_data)
			if (created_future) company.futures.push(future)
			return
		}

		// For call and put options
		let option = company.options.find((o) => o.id == id)
		let created_option = false
		if (!option) {
			created_option = true
			option = {
				id,
				expiry_date,
				strike: strike!,
				call: [],
				put: []
			}
			// company.options.push(option)
		}

		// The market data we received belongs to this option
		// However the market data can be placed in either the call field
		// Or the put field depending on option type
		if (type == 'cal' || type == 'put') {
			// if we can calculate iv and greeks for the option
			if (company.market_data.length > 1) {
				const ltp = market_data.ltp / 100
				const underlying_price =
					company.market_data[company.market_data.length - 1].ltp / 100
				const strike = option.strike
				const expiry_date = formatDate(option.expiry_date) // returns mm-dd-yyyy string
				const optionType = type == 'cal' ? 'C' : 'P'

				const inferred_data = optionsCalculation(
					ltp,
					underlying_price,
					strike,
					expiry_date,
					optionType
				)

				const optionField = type == 'cal' ? option.call : option.put
				optionField.push({ ...market_data, inferred_data })
			} else {
				const optionField = type == 'cal' ? option.call : option.put
				optionField.push(market_data)
			}
		}

		// We finally need to add the option to the company
		// And the company to the companies
		if (created_option) company.options.push(option)
		if (created_company) this.companies.push(company)

		// Next we update the latest snapshot of data
		this.#generate_snapshot()
	}

	#generate_snapshot() {
		this.companies_snapshot = this.companies.map((c) => {
			const market_data = [c.market_data[c.market_data.length - 1]]
			const options = c.options.map((o) => ({
				id: o.id,
				expiry_date: o.expiry_date,
				strike: o.strike,
				call: [o.call[o.call.length - 1]],
				put: [o.put[o.put.length - 1]]
			}))

			const futures = c.futures.map((f) => ({
				id: f.id,
				expiry_date: f.expiry_date,
				strike: f.strike,
				market_data: [f.market_data[f.market_data.length - 1]]
			}))

			let company: Company = {
				name: c.name,
				market_data,
				options,
				futures
			}

			return company
		})
	}

	#parseBuffer(buffer: Buffer) {
		const fields = [
			// { name: "length", type: "String", offset: 0, length: 4 },
			// { name: "sequence_number", type: "Long", offset: 34, length: 8 },
			{ name: 'trading_symbol', type: 'String', offset: 4, length: 30 },
			{ name: 'timestamp', type: 'Long', offset: 42, length: 8 },
			{ name: 'ltp', type: 'Long', offset: 50, length: 8 },
			{ name: 'ltq', type: 'Long', offset: 58, length: 8 },
			{ name: 'vol', type: 'Long', offset: 66, length: 8 },
			{ name: 'bid', type: 'Long', offset: 74, length: 8 },
			{ name: 'bid_qty', type: 'Long', offset: 82, length: 8 },
			{ name: 'ask', type: 'Long', offset: 90, length: 8 },
			{ name: 'ask_qty', type: 'Long', offset: 98, length: 8 },
			{ name: 'oi', type: 'Long', offset: 106, length: 8 },
			{ name: 'prev_close_price', type: 'Long', offset: 114, length: 8 },
			{ name: 'prev_oi', type: 'Long', offset: 122, length: 8 }
		]

		let result = {} as MarketData & { trading_symbol: string }

		fields.forEach((field) => {
			const { name, type, offset, length } = field

			if (buffer.length < offset + length) {
				throw new Error('Buffer size is insufficient.')
			}

			let value

			if (type === 'String') {
				const stringBytes = buffer.slice(offset, offset + length)
				value = stringBytes.toString('utf-8')
				if (value.includes('\x00')) {
					value = value.replace(/\x00/g, '')
				}
			} else if (type === 'Int32') {
				value = Number(buffer.readInt32LE(offset))
			} else if (type === 'Long') {
				value = Number(buffer.readBigInt64LE(offset))
			} else {
				throw new Error(`Unsupported data type: ${type}`)
			}

			// @ts-ignore
			result[name] = value
		})

		return {
			trading_symbol: result.trading_symbol,
			market_data: {
				timestamp: result.timestamp as number,
				ltp: result.ltp,
				ltq: result.ltq,
				vol: result.vol,
				bid: result.bid,
				ask: result.ask,
				ask_qty: result.ask_qty,
				bid_qty: result.bid_qty,
				oi: result.oi,
				prev_oi: result.prev_oi,
				prev_close_price: result.prev_close_price
			}
		}
	}

	#parseOptionsStr(str: string) {
		const [rest, _type] = [
			str.substring(0, str.length - 2),
			str.substring(str.length - 2) as 'PE' | 'CE' | 'XX'
		]
		const type = _type == 'XX' ? 'fut' : _type == 'CE' ? 'cal' : 'put'
		const day = parseInt(rest.substring(0, 2))
		const month = months.indexOf(rest.substring(2, 5))
		const year = parseInt('20' + rest.substring(5, 7))
		const expiry_date = new Date(year, month, day, 15, 30, 0).getTime()
		const strike = _type == 'XX' ? null : parseInt(rest.substring(7))
		return {
			type,
			expiry_date,
			strike
		}
	}

	home(opts: ViewOptions): Array<Company> {
		if (opts.type == 'historical') return this.companies
		return this.companies_snapshot
	}

	get(view: View, opt: ViewOptions) {
		switch (view) {
			case 'home':
				return this.home(opt)

			case 'activity':
				return true

			default:
				break
		}
	}

	req_view(view: View, opts: ViewOptions, callback: (data: any) => void) {
		const _v = this.get(view, opts)
		callback(_v)
		this.#listeners.push({ view, opts, callback })
	}
}

export default App
