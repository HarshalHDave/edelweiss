function calculateImpliedVolatility(
  underlyingPrice: number,
  strikePrice: number,
  expiryDate: number,
  optionPrice: number
): number {
  const maxIterations = 100;
  const tolerance = 0.001;
  let guess = 0.5; // Initial guess for implied volatility
  let iteration = 0;

  while (iteration < maxIterations) {
    const calculatedPrice = calculateOptionPrice(
      underlyingPrice,
      strikePrice,
      expiryDate,
      guess
    );

    const diff = optionPrice - calculatedPrice;
    if (Math.abs(diff) < tolerance) {
      // Implied volatility found within tolerance
      return guess;
    }

    const vega = calculateVega(underlyingPrice, strikePrice, expiryDate, guess);

    guess += diff / vega; // Update guess using Newton-Raphson method
    iteration++;
  }

  throw new Error("Implied volatility calculation did not converge");
}

function calculateOptionPrice(
  underlyingPrice: number,
  strikePrice: number,
  expiryDate: number,
  impliedVolatility: number
): number {
  const riskFreeRate = 0.05; // Risk-free interest rate
  const timeToExpiry = expiryDate / 365; // Convert expiry date to years

  const d1 =
    (Math.log(underlyingPrice / strikePrice) +
      (riskFreeRate + impliedVolatility ** 2 / 2) * timeToExpiry) /
    (impliedVolatility * Math.sqrt(timeToExpiry));

  const d2 = d1 - impliedVolatility * Math.sqrt(timeToExpiry);

  const callPrice =
    underlyingPrice * normcdf(d1) -
    strikePrice * Math.exp(-riskFreeRate * timeToExpiry) * normcdf(d2);

  // For simplicity, assuming European Call option
  return callPrice;
}

function calculateVega(
  underlyingPrice: number,
  strikePrice: number,
  expiryDate: number,
  impliedVolatility: number
): number {
  const riskFreeRate = 0.05; // Risk-free interest rate
  const timeToExpiry = expiryDate / 365; // Convert expiry date to years

  const d1 =
    (Math.log(underlyingPrice / strikePrice) +
      (riskFreeRate + impliedVolatility ** 2 / 2) * timeToExpiry) /
    (impliedVolatility * Math.sqrt(timeToExpiry));

  const vega = underlyingPrice * normpdf(d1) * Math.sqrt(timeToExpiry);

  return vega;
}

// Helper function to calculate cumulative distribution function (CDF) of standard normal distribution
function normcdf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + p * absX);
  const y = (((a5 * t + a4) * t + a3) * t + a2) * t + a1;
  const cdf = 0.5 * (1 + sign * (1 - Math.exp(-Math.sqrt(Math.PI) * absX) * y));

  return cdf;
}

// Helper function to calculate probability density function (PDF) of standard normal distribution
function normpdf(x: number): number {
  const constant = 1 / Math.sqrt(2 * Math.PI);
  const pdf = constant * Math.exp(-0.5 * x * x);
  return pdf;
}

calculateImpliedVolatility(100, 100, 365, 10);
