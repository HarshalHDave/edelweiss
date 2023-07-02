import data_source from '../data_source'
import Company from '../entities/company'

const repo = data_source.getRepository(Company)
export default repo
