import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Company from './company'
import Option from './option'

@Entity()
class MarketData extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'bigint' })
	timestamp: number

	@ManyToOne(() => Company, (company) => company.market_data)
	company: Company

	@ManyToOne(() => Option, (option) => option.market_data)
	option: Option

	@Column()
	// last traded quantity
	ltq: number

	@Column()
	// last traded price
	ltp: number

	@Column()
	// volume
	vol: number

	@Column()
	// bid price
	bid: number

	@Column()
	// ask price
	ask: number

	@Column()
	// bid quantity
	bid_qty: number

	@Column()
	// ask quantity
	ask_qty: number

	@Column()
	// open interest
	oi: number

	@Column()
	// previous open interest
	prev_oi: number

	@Column()
	// previous close price
	prev_close_price: number

	constructor(
		timestamp: number,
		ltq: number,
		ltp: number,
		vol: number,
		bid: number,
		ask: number,
		bid_qty: number,
		ask_qty: number,
		oi: number,
		prev_oi: number,
		prev_close_price: number
	) {
		super()
		this.timestamp = timestamp
		this.ltp = ltp
		this.ltq = ltq
		this.vol = vol
		this.bid = bid
		this.ask = ask
		this.bid_qty = bid_qty
		this.ask_qty = ask_qty
		this.oi = oi
		this.prev_oi = prev_oi
		this.prev_close_price = prev_close_price
	}
}

export default MarketData
