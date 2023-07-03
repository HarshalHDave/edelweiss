function norm_pdf(x: number): number {
	return Math.exp(-(x ** 2) / 2) / Math.sqrt(2 * Math.PI)
}

function norm_cdf(x: number): number {
	const t = 1 / (1 + 0.2316419 * Math.abs(x))
	const d = 0.3989423 * Math.exp(-(x ** 2) / 2)

	const c1 = 0.31938153
	const c2 = -0.356563782
	const c3 = 1.781477937
	const c4 = -1.821255978
	const c5 = 1.330274429

	let cumulative = 1 - d * (c1 * t + c2 * t ** 2 + c3 * t ** 3 + c4 * t ** 4 + c5 * t ** 5)

	if (x < 0) {
		cumulative = 1 - cumulative
	}

	return cumulative
}

function d1(S: number, K: number, T: number, r: number, sigma: number): number {
	return (Math.log(S / K) + (r + sigma ** 2 / 2) * T) / (sigma * Math.sqrt(T))
}

function d2(S: number, K: number, T: number, r: number, sigma: number): number {
	return d1(S, K, T, r, sigma) - sigma * Math.sqrt(T)
}

function bs_call(S: number, K: number, T: number, r: number, sigma: number): number {
	return (
		S * norm_cdf(d1(S, K, T, r, sigma)) - K * Math.exp(-r * T) * norm_cdf(d2(S, K, T, r, sigma))
	)
}

function bs_put(S: number, K: number, T: number, r: number, sigma: number): number {
	return K * Math.exp(-r * T) - S + bs_call(S, K, T, r, sigma)
}

function call_delta(S: number, K: number, T: number, r: number, sigma: number): number {
	return norm_cdf(d1(S, K, T, r, sigma))
}

function call_gamma(S: number, K: number, T: number, r: number, sigma: number): number {
	return norm_pdf(d1(S, K, T, r, sigma)) / (S * sigma * Math.sqrt(T))
}

function call_vega(S: number, K: number, T: number, r: number, sigma: number): number {
	return 0.01 * (S * norm_pdf(d1(S, K, T, r, sigma)) * Math.sqrt(T))
}

function call_theta(S: number, K: number, T: number, r: number, sigma: number): number {
	return (
		0.01 *
		(-(S * norm_pdf(d1(S, K, T, r, sigma)) * sigma) / (2 * Math.sqrt(T)) -
			r * K * Math.exp(-r * T) * norm_cdf(d2(S, K, T, r, sigma)))
	)
}

function call_rho(S: number, K: number, T: number, r: number, sigma: number): number {
	return 0.01 * (K * T * Math.exp(-r * T) * norm_cdf(d2(S, K, T, r, sigma)))
}

function put_delta(S: number, K: number, T: number, r: number, sigma: number): number {
	return -norm_cdf(-d1(S, K, T, r, sigma))
}

function put_gamma(S: number, K: number, T: number, r: number, sigma: number): number {
	return norm_pdf(d1(S, K, T, r, sigma)) / (S * sigma * Math.sqrt(T))
}

function put_vega(S: number, K: number, T: number, r: number, sigma: number): number {
	return 0.01 * (S * norm_pdf(d1(S, K, T, r, sigma)) * Math.sqrt(T))
}

function put_theta(S: number, K: number, T: number, r: number, sigma: number): number {
	return (
		0.01 *
		(-(S * norm_pdf(d1(S, K, T, r, sigma)) * sigma) / (2 * Math.sqrt(T)) +
			r * K * Math.exp(-r * T) * norm_cdf(-d2(S, K, T, r, sigma)))
	)
}

function put_rho(S: number, K: number, T: number, r: number, sigma: number): number {
	return 0.01 * (-K * T * Math.exp(-r * T) * norm_cdf(-d2(S, K, T, r, sigma)))
}

function implied_volatility(
	Price: number,
	S: number,
	K: number,
	T: number,
	r: number,
	put_or_call: string
): number | string {
	let sigma = 0.001

	if (put_or_call === 'C') {
		while (sigma < 1) {
			let Price_implied =
				S * norm_cdf(d1(S, K, T, r, sigma)) -
				K * Math.exp(-r * T) * norm_cdf(d2(S, K, T, r, sigma))

			if (Price - Price_implied < 0.001) {
				return sigma
			}
			sigma += 0.001
		}
		return 0
	} else {
		while (sigma < 1) {
			let Price_implied = K * Math.exp(-r * T) - S + bs_call(S, K, T, r, sigma)

			if (Price - Price_implied < 0.001) {
				return sigma
			}
			sigma += 0.001
		}
		return 0
	}
}

export function optionsCalculation(
	price: number, // ltp
	underlying_price: number, // current stock price
	strike_price: number, // strike price
	expiration_date: string, // (mm-dd-yyyy) expiration date
	put_or_call: string
) {
	let S = underlying_price
	let K = strike_price
	let T = expiration_date
	let r = 5
	let sigma = 10

	let expiration_datetime = new Date(T + ' 15:30')
	let current_datetime = new Date()
	// @ts-expect-error
	let time = (expiration_datetime - current_datetime) / (1000 * 60 * 60 * 24) / 300

	r = r / 100
	sigma = sigma / 100

	if (put_or_call === 'C') {
		const iv = implied_volatility(price, S, K, time, r, put_or_call)

		return {
			price: bs_call(S, K, time, r, sigma),
			delta: call_delta(S, K, time, r, sigma),
			gamma: call_gamma(S, K, time, r, sigma),
			vega: call_vega(S, K, time, r, sigma),
			rho: call_rho(S, K, time, r, sigma),
			theta: call_theta(S, K, time, r, sigma),
			// @ts-expect-error
			implied_volatility: 100 * iv
		}
	} else {
		const iv = implied_volatility(price, S, K, time, r, put_or_call)

		return {
			price: bs_put(S, K, time, r, sigma),
			delta: put_delta(S, K, time, r, sigma),
			gamma: put_gamma(S, K, time, r, sigma),
			vega: put_vega(S, K, time, r, sigma),
			rho: put_rho(S, K, time, r, sigma),
			theta: put_theta(S, K, time, r, sigma),
			// @ts-expect-error
			implied_volatility: 100 * iv
		}
	}
}

export function formatDate(timestamp: number): string {
	const date = new Date(timestamp)

	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const year = String(date.getFullYear())

	return `${month}-${day}-${year}`
}

console.log(optionsCalculation(298, 19319, 19050, '07-06-2023', 'C'))
