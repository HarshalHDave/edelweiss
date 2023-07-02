import data_source from '../data_source'
import MarketData from '../entities/market_data'

const repo = data_source.getRepository(MarketData)
export default repo
