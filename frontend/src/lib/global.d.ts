interface Stock {
	name: string
	options: Array<Option>
}

interface SpotStock {
	name: string
	data: Array<TimeVariantData>
}

interface Option {
	trading_symbol: string
	type: 'cal' | 'put' | 'fut'
	expiry_date: number // timestamp in milliseconds (append 3:30 evening)
	strike: number | null // will be null for type='fut'
	data: Array<TimeVariantData>
}

interface TimeVariantData {
	timestamp: Number
	ltq: number
	ltp: number
	vol: number
	bid: number
	ask: number
	bid_qty: number
	ask_qty: number
	oi: number
	prev_oi: number
	prev_close_price: number
}
