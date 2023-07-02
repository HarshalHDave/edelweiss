import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import './db/data_source'
import logger from './lib/logger'

import http from 'http'
// import App from './app'
import DataStream from './data_stream'
import Server from './server'

const data_stream = new DataStream()
const http_server = http.createServer()
const socket_server = new Server(http_server, data_stream)

const port = process.env.PORT || 80
http_server.listen(port)

logger.info('Server started', { port })
