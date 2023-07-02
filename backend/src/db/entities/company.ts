import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import MarketData from './market_data'
import Option from './option'

@Entity()
class Company extends BaseEntity {
	@PrimaryColumn()
	name: string

	@OneToMany(() => MarketData, (market_data) => market_data.company)
	market_data: MarketData[]

	@OneToMany(() => Option, (option) => option.company)
	options: Option[]

	constructor(name: string, market_data: MarketData[], options: Option[]) {
		super()
		this.name = name
		this.market_data = market_data
		this.options = options
	}
}

// export const company_repo = data_source.getRepository(Company)

export default Company
