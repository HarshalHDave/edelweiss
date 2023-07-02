import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import OptionMarketData from './option_market_data'
import Company from './company'

@Entity()
class Option extends BaseEntity {
	@PrimaryColumn()
	trading_symbol: string

	@ManyToOne(() => Company, (company) => company.options)
	company: Company

	@OneToMany(() => OptionMarketData, (market_data) => market_data.option)
	market_data: Array<OptionMarketData>
}

export default Option
