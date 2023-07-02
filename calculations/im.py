from math import log, sqrt, pi, exp
from scipy.stats import norm
from datetime import datetime, date
import numpy as np
import pandas as pd
from pandas import DataFrame

# Underlying price -
# strike - Strike price
# expiry - expiry_date
# sigma (volatility) -
# optionPrice - ltp


def d1(S, K, T, r, sigma):
    return (log(S/K)+(r+sigma**2/2.)*T)/sigma*sqrt(T)


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


# S = float(input("current stock price: "))
S = 100
# K = float(input("strike price: "))
K = 110


# expiration_date = input("(mm-dd-yyyy) expiration date: ")
expiration_date = "08-08-2023"
expiration_date = datetime.strptime(expiration_date, "%m-%d-%Y")
T = (expiration_date - datetime.utcnow()).days / 365

r = 5
# sigma = float(input("volatility(%): "))
sigma = 20

data = {'Symbol': ['S', 'K', 'T', 'r', 'sigma'],
        'Input': [S, K, T, r, sigma]}
input_frame = DataFrame(data, columns=['Symbol', 'Input'],
                        index=['Underlying price', 'Strike price', 'Time to maturity', 'Risk-free interest rate', 'Volatility'])
print(input_frame)

# calculate the call / put option price and the greeks of the call / put option
r = r/100
sigma = sigma/100
price_and_greeks = {'Call': [bs_call(S, K, T, r, sigma), call_delta(S, K, T, r, sigma), call_gamma(S, K, T, r, sigma), call_vega(S, K, T, r, sigma), call_rho(S, K, T, r, sigma), call_theta(S, K, T, r, sigma)],
                    'Put': [bs_put(S, K, T, r, sigma), put_delta(S, K, T, r, sigma), put_gamma(S, K, T, r, sigma), put_vega(S, K, T, r, sigma), put_rho(S, K, T, r, sigma), put_theta(S, K, T, r, sigma)]}
price_and_greeks_frame = DataFrame(price_and_greeks, columns=['Call', 'Put'], index=[
                                   'Price', 'delta', 'gamma', 'vega', 'rho', 'theta'])
print(price_and_greeks_frame)

# option = input("(P/C) Put or Call: ")
option = 'P'

# Price = input("option price: ");
# Price = float(Price)
Price = 10


def implied_volatility(Price, S, K, T, r):
    sigma = 0.001

    if option == 'C':
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


print("The implied volatility is " +
      str(100 * implied_volatility(Price, S, K, T, r)) + " %.")
