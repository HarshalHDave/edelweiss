from math import log, sqrt, exp
from scipy.stats import norm
from datetime import datetime
from pandas import DataFrame


S = float(input("current stock price: "))
K = float(input("strike price: "))


expiration_date = input(
    "(mm-dd-yyyy) expiration date: ")
expiration_date = datetime.strptime(expiration_date, "%m-%d-%Y")
T = (expiration_date - datetime.utcnow()).days / 365

r = 5
sigma = float(input("volatility(%): "))

data = {'Symbol': ['S', 'K', 'T', 'r', 'sigma'],
        'Input': [S, K, T, r, sigma]}
input_frame = DataFrame(data, columns=['Symbol', 'Input'],
                        index=['Underlying price', 'Strike price', 'Time to maturity', 'Risk-free interest rate', 'Volatility'])

print(input_frame)
