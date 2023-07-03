import '../types'

export function calculateImpliedVolatility(stock: Company): number {
	const { spotPrice, strikePrice, timeToExpiry, riskFreeRate, optionType, marketPrice } =
		extractOptionData(stock)

	const precision = 0.00001
	const maxIterations = 100

	// initial guess for volatility
	let volatility = 0.5
	let priceDiff = 1
	let iteration = 0

	while (Math.abs(priceDiff) > precision && iteration < maxIterations) {
		const d1 =
			(Math.log(spotPrice / strikePrice) +
				(riskFreeRate + (volatility * volatility) / 2) * timeToExpiry) /
			(volatility * Math.sqrt(timeToExpiry))
		const d2 = d1 - volatility * Math.sqrt(timeToExpiry)

		let calculatedPrice: number
		if (optionType === 'call') {
			calculatedPrice =
				spotPrice *
					Math.exp(-riskFreeRate * timeToExpiry) *
					cumulativeNormalDistribution(d1) -
				strikePrice *
					Math.exp(-riskFreeRate * timeToExpiry) *
					cumulativeNormalDistribution(d2)
		} else if (optionType === 'put') {
			calculatedPrice =
				strikePrice *
					Math.exp(-riskFreeRate * timeToExpiry) *
					cumulativeNormalDistribution(-d2) -
				spotPrice *
					Math.exp(-riskFreeRate * timeToExpiry) *
					cumulativeNormalDistribution(-d1)
		} else {
			throw new Error("Invalid option type. Must be 'call' or 'put'.")
		}

		priceDiff = calculatedPrice - marketPrice

		// Calculate the derivative of the Black-Scholes equation with respect to volatility
		const vega =
			spotPrice *
			Math.exp(-riskFreeRate * timeToExpiry) *
			Math.sqrt(timeToExpiry) *
			standardNormalDistribution(d1)

		// Update the volatility using Newton-Raphson method
		volatility = volatility - priceDiff / vega

		iteration++
	}

	return volatility
}

function cumulativeNormalDistribution(x: number): number {
	const a1 = 0.254829592
	const a2 = -0.284496736
	const a3 = 1.421413741
	const a4 = -1.453152027
	const a5 = 1.061405429
	const p = 0.3275911

	const sign = x < 0 ? -1 : 1
	const absX = Math.abs(x)
	const t = 1.0 / (1.0 + p * absX)
	const y = (((a5 * t + a4) * t + a3) * t + a2) * t + a1
	const erf = 1 - y * Math.exp(-absX * absX)

	return 0.5 * (1 + sign * erf)
}

function standardNormalDistribution(x: number): number {
	return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
}

function extractOptionData(stock: Company): {
	optionType: string
	spotPrice: number
	strikePrice: number
	riskFreeRate: number
	timeToExpiry: number
	marketPrice: number
} {
	const option = stock.options[0]

	const optionType = option.type === 'cal' ? 'call' : 'put'
	const spotPrice = option.data[0].ltp
	const strikePrice = option.strike || 0
	const riskFreeRate = 0
	const timeToExpiry = (option.expiry_date - Date.now()) / (1000 * 60 * 60 * 24)
	const marketPrice = option.data[0].ltp

	return {
		optionType,
		spotPrice,
		strikePrice,
		riskFreeRate,
		timeToExpiry,
		marketPrice
	}
}
