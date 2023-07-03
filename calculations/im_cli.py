from math import log, sqrt, exp
from scipy.stats import norm
from datetime import datetime


def d1(S, K, T, r, sigma):
    return (log(S/K)+(r+sigma**2/2.)*T)/sigma*sqrt(T)
    # return ((log(S/K)+(r+0.5*sigma**2)*T))/(sigma*sqrt(T))


def d2(S, K, T, r, sigma):
    return d1(S, K, T, r, sigma)-sigma*sqrt(T)


def bs_call(S, K, T, r, sigma):
    return S*norm.cdf(d1(S, K, T, r, sigma))-K*exp(-r*T)*norm.cdf(d2(S, K, T, r, sigma))


def bs_put(S, K, T, r, sigma):
    return K*exp(-r*T)-S+bs_call(S, K, T, r, sigma)


def call_delta(S, K, T, r, sigma):
    return norm.cdf(d1(S, K, T, r, sigma))


def call_gamma(S, K, T, r, sigma):
    return norm.pdf(d1(S, K, T, r, sigma))/(S*sigma*sqrt(T))


def call_vega(S, K, T, r, sigma):
    return 0.01*(S*norm.pdf(d1(S, K, T, r, sigma))*sqrt(T))


def call_theta(S, K, T, r, sigma):
    return 0.01*(-(S*norm.pdf(d1(S, K, T, r, sigma))*sigma)/(2*sqrt(T)) - r*K*exp(-r*T)*norm.cdf(d2(S, K, T, r, sigma)))


def call_rho(S, K, T, r, sigma):
    return 0.01*(K*T*exp(-r*T)*norm.cdf(d2(S, K, T, r, sigma)))


def put_delta(S, K, T, r, sigma):
    return -norm.cdf(-d1(S, K, T, r, sigma))


def put_gamma(S, K, T, r, sigma):
    return norm.pdf(d1(S, K, T, r, sigma))/(S*sigma*sqrt(T))


def put_vega(S, K, T, r, sigma):
    return 0.01*(S*norm.pdf(d1(S, K, T, r, sigma))*sqrt(T))


def put_theta(S, K, T, r, sigma):
    return 0.01*(-(S*norm.pdf(d1(S, K, T, r, sigma))*sigma)/(2*sqrt(T)) + r*K*exp(-r*T)*norm.cdf(-d2(S, K, T, r, sigma)))


def put_rho(S, K, T, r, sigma):
    return 0.01*(-K*T*exp(-r*T)*norm.cdf(-d2(S, K, T, r, sigma)))


def implied_volatility(Price, S, K, T, r, put_or_call):
    sigma = 0.001

    if put_or_call == 'C':
        while sigma < 1:
            Price_implied = S * \
                norm.cdf(d1(S, K, T, r, sigma))-K*exp(-r*T) * \
                norm.cdf(d2(S, K, T, r, sigma))
            if Price-(Price_implied) < 0.001:
                return sigma
            sigma += 0.001
        return "something wrong"
    else:
        while sigma < 1:
            Price_implied = K*exp(-r*T)-S+bs_call(S, K, T, r, sigma)
            if Price-(Price_implied) < 0.001:
                return sigma
            sigma += 0.001
        return "something wrong"


def calculation(price,  # ltp
                underlying_price,  # current stock price
                strike_price,  # strike price
                expiration_date,  # (mm-dd-yyyy) expiration date
                put_or_call):
    price = price
    S = underlying_price
    K = strike_price
    T = expiration_date
    put_or_call = put_or_call

    expiration_datetime = datetime.strptime(T + " 15:30", "%m-%d-%Y %H:%M")
    current_datetime = datetime.now()
    print(expiration_datetime, current_datetime)
    T = (expiration_datetime - current_datetime).days / 365

    print(T)
    # T = 0.12876712328767123

    r = 20
    sigma = 10

    r = r/100
    sigma = sigma/100

    if put_or_call == 'C':
        return {
            'price': bs_call(S, K, T, r, sigma),
            'delta': call_delta(S, K, T, r, sigma),
            'gamma': call_gamma(S, K, T, r, sigma),
            'vega': call_vega(S, K, T, r, sigma),
            'rho': call_rho(S, K, T, r, sigma),
            'theta': call_theta(S, K, T, r, sigma),
            'implied_volatility': 100 * implied_volatility(price, S, K, T, r, put_or_call),
        }

    if put_or_call == 'P':
        return {
            'price': bs_put(S, K, T, r, sigma),
            'delta': put_delta(S, K, T, r, sigma),
            'gamma': put_gamma(S, K, T, r, sigma),
            'vega': put_vega(S, K, T, r, sigma),
            'rho': put_rho(S, K, T, r, sigma),
            'theta': put_theta(S, K, T, r, sigma),
            'implied_volatility': 100 * implied_volatility(price, S, K, T, r, put_or_call),
        }

    return {}
