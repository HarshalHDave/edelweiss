import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import MarketData from './market_data'
import Company from './company'

@Entity()
class Option extends BaseEntity {
	@PrimaryColumn()
	trading_symbol: string

	@ManyToOne(() => Company, (company) => company.options)
	company: Company

	@OneToMany(() => MarketData, (market_data) => market_data.option)
	market_data: MarketData[]

	@Column()
	type: 'cal' | 'put' | 'fut'

	@Column({ type: 'bigint' })
	// timestamp in milliseconds (append 3:30 evening)
	expiry_date: number

	@Column({ type: 'int', nullable: true })
	// will be null for type='fut'
	strike: number | null

	constructor(
		trading_symbol: string,
		type: 'cal' | 'put' | 'fut',
		expiry_date: number,
		strike: number | null
	) {
		super()
		this.trading_symbol = trading_symbol
		this.type = type
		this.expiry_date = expiry_date
		this.strike = strike
	}
}

export default Option
