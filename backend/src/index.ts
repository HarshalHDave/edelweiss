import dotenv from 'dotenv'
dotenv.config()
import logger from './lib/logger'

import App from './app'
import http from 'http'
import Server from './server'

const http_server = http.createServer()
const socket_server = new Server(http_server)

const port = process.env.PORT || 80
http_server.listen(port)

logger.info('Server started', { port })
