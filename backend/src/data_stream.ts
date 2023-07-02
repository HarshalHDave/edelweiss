import { EventEmitter } from 'stream'
import net, { type Socket } from 'net'
import './types'

// Calculator
import { calculateImpliedVolatility } from './lib/calculateVolitility'

// Config
import { get_stream_host, get_stream_port } from './lib/utils'

// Utils
import { split_at_number } from './lib/utils'

// DB Entities
import Company from './db/entities/company'
import Option from './db/entities/option'
import MarketData from './db/entities/market_data'

// DB Repositories
import company_repo from './db/repositories/company'
import option_repo from './db/repositories/option'
import market_data_repo from './db/repositories/market_data'

import logger from './lib/logger'

const months = 'JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC'.split(', ')

class DataStream extends EventEmitter {
	#socket: Socket
	// stocks: Array<Stock> = []
	// spot_stocks: Array<SpotStock> = []

	constructor() {
		super()

		// Create a socket instance
		const host = get_stream_host()
		const port = get_stream_port()
		this.#socket = new net.Socket()

		const connect = () => {
			this.#socket.connect(port, host, () => {
				logger.info('Connected', { host, port })

				// Send a byte of data to initiate connection
				const byte_data = Buffer.from([0x41])
				this.#socket.write(byte_data)
				logger.info('Sent a byte of data:', { byte_data })
			})
		}

		// Connect to the data server
		connect()

		this.#socket.on('error', () => {
			logger.info('Failed to connect to data server')
		})

		// Handle incoming data from the server
		this.#socket.on('data', this.#receive.bind(this))

		this.#socket.on('close', () => {
			logger.info('Connection closed. Retrying in 1s')
			setTimeout(connect, 1000)
		})
	}

	async #receive(in_data: Buffer) {
		if (in_data.length != 130) return
		const parsed = this.#parseBuffer(in_data)
		const { trading_symbol, market_data } = parsed

		const [name, options] = split_at_number(trading_symbol)

		let company = await company_repo.findOneBy({ name })
		if (company == null) company = new Company(name)

		if (options == '') {
			// The market data we received is a company's spot data
			// Modify the market data to reflect the same
			market_data.company = company
			// Insert this market data into the company
			if (company.market_data) company.market_data.push(market_data)
			else company.market_data = [market_data]

			await company_repo.save(company)
			await market_data_repo.save(market_data)
		} else {
			// The market data we received is an option's data
			// Check if this option is already present
			let option = await option_repo.findOneBy({ trading_symbol })
			if (option == null) {
				// Option does not exist
				// Extract options data and create a new option
				const { type, expiry_date, strike } = this.#parseOptionsStr(options)
				option = new Option(trading_symbol, type as any, expiry_date, strike)
				option.company = company
				option.market_data = [market_data]
			} else {
				if (option.market_data) option.market_data.push(market_data)
				else option.market_data = [market_data]
			}

			// Modify the market data to reflect the same
			market_data.company = company
			market_data.option = option

			await company_repo.save(company)
			await option_repo.save(option)
			await market_data_repo.save(market_data)
		}

		this.emit('update')
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

		let result = {} as TimeVariantData & { trading_symbol: string }

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
			market_data: new MarketData(
				result.timestamp as number,
				result.ltp,
				result.ltq,
				result.vol,
				result.bid,
				result.ask,
				result.bid_qty,
				result.ask_qty,
				result.oi,
				result.prev_oi,
				result.prev_close_price
			)
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
}

export default DataStream
