export function isProd() {
	return process.env.ENV == 'prod'
}

export function get_stream_host() {
	return process.env.DATA_STREAM_HOST || 'localhost'
}

export function get_stream_port() {
	return parseInt(process.env.DATA_STREAM_PORT || '8000')
}

export function read_till_number(str: string, a = 0): [string, number, number] {
	let b = a
	for (let i = a; i < str.length; i++)
		if (isNaN(parseInt(str[i]))) b = i + 1
		else break
	return [str.substring(a, b), a, b]
}

export function split_at_number(str: string) {
	let a = 0,
		b = a
	for (let i = a; i < str.length; i++)
		if (isNaN(parseInt(str[i]))) b = i + 1
		else break
	return [str.substring(a, b), str.substring(b)]
}
