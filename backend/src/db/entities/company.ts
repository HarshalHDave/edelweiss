import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import CompanyMarketData from './company_market_data'
import Option from './option'

@Entity()
class Company extends BaseEntity {
	@PrimaryColumn()
	name: string

	@OneToMany(() => CompanyMarketData, (market_data) => market_data.company)
	market_data: Array<CompanyMarketData>

	@OneToMany(() => Option, (option) => option.company)
	options: Array<Option>
}

export default Company
