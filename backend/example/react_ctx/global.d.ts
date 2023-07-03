// Core ------------------------------------------------------------

interface Company {
	name: string;
}

interface Option {
	type: "cal" | "put" | "fut";
	trading_symbol: string;
	expiry_date: number; // timestamp in milliseconds (append 3:30 evening)
	strike: number;
}

interface Future {
	id: string;
	expiry_date: number; // timestamp in milliseconds (append 3:30 evening)
	strike: number;
}

interface MarketData {
	timestamp: Number;
	ltq: number; // last traded quantity
	ltp: number; // last traded price
	vol: number; // volume
	bid: number; // bid price
	ask: number; // ask price
	bid_qty: number; // bid quantity
	ask_qty: number; // ask quantity
	oi: number; // open interest
	prev_oi: number; // previous open interest
	prev_close_price: number; // previous close price
}

// Data Views ---------------------------------------------------------

type Resources = "company" | "option" | "market_data"; // 'future' will be added soon

interface View {
	resource: Resources;

	// If not provided, all resources will be listed
	id?: string;

	// Related resources to be fetched.
	// Will throw errors if unrelated resources are specified
	include?: string[];

	// For any INCLUDED 'market_data', whether to display entire history or only the latest snapshot
	// Will have no effect if the resource requested itself is market_data
	// Will default to False
	history?: boolean;

	order?: [
		string, // Attribute name. Will throw error if attribute is non-existent
		"ASC" | "DESC"
	];

	filters?: [
		[
			string, // Attribute name. Will throw an error if attribute is non-existent
			">" | ">=" | "==" | "<=" | "<", // Comparison operator
			any // Value to compare with. Will throw an error if value is non-comparable to attribute type
		]
	];

	// Limit the number of resources returned
	// Has no effect if id is provided
	limit?: number;
}

interface Err {
	msg: string;
	data?: any;
}
