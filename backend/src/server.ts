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
			// Fetch current state of app and send to client
			// socket.emit('stocks', app.stocks)
			// socket.emit('spot_stocks', app.spot_stocks)
			socket.emit('realtime_options', app.realtime_options)
			// Assign event listener to listen to the state of app
			// Upon each new event, send state of the app to client
			app.on('update', () => {
				socket.emit('realtime_options', app.realtime_options)
				// socket.emit('stocks', app.stocks)
				// socket.emit('spot_stocks', app.spot_stocks)
			})
		})
	}
}

export default Server
