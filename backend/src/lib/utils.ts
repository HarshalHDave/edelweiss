export function isProd() {
	return process.env.ENV == 'prod'
}

export function get_stream_host() {
	return process.env.DATA_STREAM_HOST || 'localhost'
}

export function get_stream_port() {
	return parseInt(process.env.DATA_STREAM_PORT || '8000')
}
