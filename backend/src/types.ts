// Core ------------------------------------------------------------

interface Company {
	name: string
	market_data: Array<MarketData>
	options: Array<Option>
	futures: Array<Future>
}

interface Option {
	id: string
	expiry_date: number // timestamp in milliseconds (append 3:30 evening)
	strike: number
	call: Array<MarketData>
	put: Array<MarketData>
}

interface Future {
	id: string
	expiry_date: number // timestamp in milliseconds (append 3:30 evening)
	strike: number
	market_data: Array<MarketData>
}

interface MarketData {
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

// Data Views ---------------------------------------------------------

type View = 'home'

interface ViewOptions {
	type: 'latest' | 'historical'
}
