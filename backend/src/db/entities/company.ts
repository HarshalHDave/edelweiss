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

	constructor(name: string) {
		super()
		this.name = name
	}
}

export default Company
