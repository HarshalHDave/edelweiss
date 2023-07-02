import App from './app'
import { Server as HttpServer } from 'http'
import { Server as SocketServer, Socket } from 'socket.io'
import DataStream from './data_stream'
import './types'
import logger from './lib/logger'

class Server extends SocketServer {
	#data_stream: DataStream

	constructor(http_server: HttpServer) {
		super(http_server, {
			// CORS config
			cors: {
				origin: process.env.CLIENT_ORIGIN ?? '*'
			},
			// Do no serve the client library
			serveClient: false
		})

		this.#data_stream = new DataStream()

		this.on('connection', (socket) => {
			// Fetch current state of app and send to client
			// socket.emit('stocks', app.stocks)
			// socket.emit('spot_stocks', app.spot_stocks)
			// Assign event listener to listen to the state of app
			// Upon each new event, send state of the app to client
			// app.on('update', () => {
			// socket.emit('stocks', app.stocks)
			// socket.emit('spot_stocks', app.spot_stocks)
			// })

			socket.on('req', (token: string, opt: ViewOptions) => {
				logger.debug('Recevied req', { token, opt })
				this.#data_stream.req_view(opt, (data: any) => {
					logger.debug('Recevied res')
					const res: ResOptions = {
						token,
						data
					}
					socket.emit('res', res)
				})
			})
		})
	}
}

export default Server
