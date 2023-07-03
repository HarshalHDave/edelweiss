import { Server as SocketServer } from 'socket.io'
import type { Server as HttpServer } from 'http'

import './types'
import DataStream from './data_stream'

class Server extends SocketServer {
	data_stream: DataStream

	constructor(http_server: HttpServer) {
		super(http_server, {
			// CORS config
			cors: {
				origin: process.env.CLIENT_ORIGIN ?? '*'
			},
			// Do no serve the client library
			serveClient: false
		})

		this.data_stream = new DataStream()

		this.on('connection', (socket) => {
			socket.on('req', (token: string, view: View) => {
				this.data_stream.req_view(token, view, (_token, data, err) => {
					socket.emit('res', _token, data, err)
				})
			})
		})
	}
}

export default Server
