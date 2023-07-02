import { Server as SocketServer } from 'socket.io'
import type { Server as HttpServer } from 'http'

import App from './app'

import './types'

class Server extends SocketServer {
	constructor(http_server: HttpServer, app: App) {
		super(http_server, {
			// CORS config
			cors: {
				origin: process.env.CLIENT_ORIGIN ?? '*'
			},
			// Do no serve the client library
			serveClient: false
		})

		this.on('connection', (socket) => {
			socket.on('req', (token: string, view: View, opts: ViewOptions) => {
				app.req_view(view, opts, (data: any) => {
					socket.emit('res', token, data)
				})
			})
		})
	}
}

export default Server
