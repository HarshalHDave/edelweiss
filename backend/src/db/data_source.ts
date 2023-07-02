import dotenv from 'dotenv'
dotenv.config()

import { DataSource } from 'typeorm'

if (!(process.env.DB_HOST || process.env.DB_USER || process.env.DB_PASS || process.env.DB_NAME))
	throw new Error(
		`Environment variables missing. 
        DB_HOST: ${process.env.DB_HOST}; 
        DB_PORT: ${process.env.DB_PORT}; 
        DB_USER: ${process.env.DB_USER}; 
        DB_PASS: ${process.env.DB_PASS}; 
        DB_NAME: ${process.env.DB_NAME}`
	)

const data_source = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '3306'),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: ['src/db/entities/**/*.ts'],
	migrations: ['src/db/migrations/**/*.ts'],
	logging: ['error', 'migration']
})

data_source
	.initialize()
	.then(() => {
		console.log('Data Source has been initialized!')
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err)
	})

export default data_source
