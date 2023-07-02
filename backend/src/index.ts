import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import logger from './lib/logger'

import http from 'http'
import App from './app'
import Server from './server'

const app = new App()
const http_server = http.createServer()
const socket_server = new Server(http_server, app)

const port = process.env.PORT || 80
http_server.listen(port)

logger.info('Server started', { port })
