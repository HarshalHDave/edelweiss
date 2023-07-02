import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import './db/data_source'
import logger from './lib/logger'

import http from 'http'
import Server from './server'

const http_server = http.createServer()
const socket_server = new Server(http_server, app)

const port = process.env.PORT || 80
http_server.listen(port)

logger.info('Server started', { port })
