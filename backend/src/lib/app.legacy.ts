import net, { Socket } from 'net'
import { EventEmitter } from 'stream'
import { get_stream_host, get_stream_port } from './lib/utils'

import logger from './lib/logger'
import { calculateImpliedVolatility } from './lib/calculateVolitility'

import './types'

const months = 'JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC'.split(', ')

class App extends EventEmitter {
	#socket: Socket
	stocks: Array<Stock> = []
	spot_stocks: Array<SpotStock> = []

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

	get state(): Data {
		return {
			stocks: this.stocks,
			spot_stocks: this.spot_stocks
		}
	}

	#read_till_number(str: string, a = 0): [string, number, number] {
		let b = a
		for (let i = a; i < str.length; i++)
			if (isNaN(parseInt(str[i]))) b = i + 1
			else break
		return [str.substring(a, b), a, b]
	}

	#receive(in_data: Buffer) {
		if (in_data.length != 130) return
		const parsed = this.#parseBuffer(in_data)
		const { trading_symbol, ...time_variant_data } = parsed

		const [name, a, b] = this.#read_till_number(trading_symbol)

		if (name == trading_symbol) {
			// it is spot data
			const existing_entry = this.spot_stocks.findIndex((stock) => stock.name == name)

			if (existing_entry == -1) {
				// New entry
				this.spot_stocks.push({
					name,
					data: [time_variant_data]
				})
			} else {
				// Existing entry
				this.spot_stocks[existing_entry].data.push(time_variant_data)
			}
		} else {
			// it is non-spot data
			const existing_entry = this.stocks.findIndex((stock) => stock.name == name)

			if (existing_entry == -1) {
				// New stock
				const [symbol, _type] = [
					trading_symbol.substring(0, parsed.trading_symbol.length - 2),
					trading_symbol.substring(parsed.trading_symbol.length - 2) as 'PE' | 'CE' | 'XX'
				]
				const day = parseInt(symbol.substring(b, b + 2))
				const month = months.indexOf(symbol.substring(b + 2, b + 5))
				const year = parseInt('20' + symbol.substring(b + 5, b + 7))
				const expiry_date = new Date(year, month, day, 15, 30, 0).getTime()

				const strike = _type == 'XX' ? null : parseInt(symbol.substring(b + 7))
				const type = _type == 'XX' ? 'fut' : _type == 'CE' ? 'cal' : 'put'

				const obj: Stock = {
					name,
					options: [
						{
							trading_symbol,
							type,
							expiry_date,
							strike,
							data: [time_variant_data]
						}
					]
				}

				console.log(calculateImpliedVolatility(obj))

				this.stocks.push(obj)
			} else {
				// Existing stock
				const existing_opt = this.stocks[existing_entry].options.findIndex(
					(o) => o.trading_symbol == trading_symbol
				)
				if (existing_opt == -1) {
					// New option
					const [symbol, _type] = [
						trading_symbol.substring(0, parsed.trading_symbol.length - 2),
						trading_symbol.substring(parsed.trading_symbol.length - 2) as
							| 'PE'
							| 'CE'
							| 'XX'
					]
					const day = parseInt(symbol.substring(b, b + 2))
					const month = months.indexOf(symbol.substring(b + 2, b + 5))
					const year = parseInt('20' + symbol.substring(b + 5, b + 7))
					const expiry_date = new Date(year, month, day, 15, 30, 0).getTime()

					const strike = _type == 'XX' ? null : parseInt(symbol.substring(b + 7))
					const type = _type == 'XX' ? 'fut' : _type == 'CE' ? 'cal' : 'put'

					const option: Option = {
						trading_symbol,
						type,
						expiry_date,
						strike,
						data: [time_variant_data]
					}

					console.log(calculateImpliedVolatility({ name: 'qww', options: [option] }))

					this.stocks[existing_entry].options.push(option)
				} else {
					// Existing option
					this.stocks[existing_entry].options[existing_opt].data.push(time_variant_data)
				}
			}
		}

		this.emit('update')
		// logger.info('Data', {
		// 	this.spot_stocks,
		// 	this.stocks
		// })
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

		return result!
	}
}

export default App
