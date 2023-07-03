import net from 'net'
import { parentPort, workerData } from 'worker_threads'

// Create a socket instance
const { host, port } = workerData
const socket = new net.Socket()

// Connect to the data server
connect()

function connect() {
	socket.connect(port, host, () => {
		// Send a byte of data to initiate connection
		const byte_data = Buffer.from([0x41])
		socket.write(byte_data)
	})
}

socket.on('data', receive)

socket.on('error', () => {
	console.log('WORKER: Failed to connect to server')
})

socket.on('close', () => {
	console.log('WORKER: Connection closed. Retrying in 2s')
	setTimeout(connect, 5000)
})

function receive(buffer) {
	if (!buffer) return
	for (let i = 0; i <= buffer.length % 130; i++) {
		const byteArray = buffer.slice(130 * i, 130 * i + 130)
		const data = parseByteArray(byteArray)
		parentPort.postMessage(data)
	}
}

function parseByteArray(buffer) {
	if (buffer.length < offset + length) {
		return
	}

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

	let result = {}

	fields.forEach((field) => {
		const { name, type, offset, length } = field

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

		result[name] = value
	})

	return {
		trading_symbol: result.trading_symbol,
		market_data: {
			timestamp: result.timestamp,
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
