interface Data {
	stocks: Array<Stock>
	spot_stocks: Array<SpotStock>
}

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
	ltq: number // last traded quantity
	ltp: number // last traded price
	vol: number // volume
	bid: number // bid price
	ask: number // ask price
	bid_qty: number // bid quantity
	ask_qty: number // ask quantity
	oi: number // open interest
	prev_oi: number // previous open interest
	prev_close_price: number // previous close price
}

interface ViewOptions {
	type: 'latest' | 'historical'
}

interface ResOptions {
	token: string
	data: any
}
