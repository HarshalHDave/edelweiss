import App from './app'
import { Server as HttpServer } from 'http'
import { Server as SocketServer, Socket } from 'socket.io'

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
			socket.emit('stocks', app.stocks)
			socket.emit('spot_stocks', app.spot_stocks)

			// Assign event listener to listen to the state of app
			// Upon each new event, send state of the app to client
			app.on('update', () => {
				socket.emit('stocks', app.stocks)
				socket.emit('spot_stocks', app.spot_stocks)
			})
		})
	}
}

export default Server
