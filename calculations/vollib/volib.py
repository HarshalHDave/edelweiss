import py_vollib.black_scholes
from datetime import datetime

T = "06-09-2024"

expiration_datetime = datetime.strptime(T + " 15:30", "%m-%d-%Y %H:%M")
current_datetime = datetime.now()
print(expiration_datetime, current_datetime)
T = (expiration_datetime - current_datetime).days / 365

S = 100
K = 100
sigma = .2
r = .01
flag = 'c'

price = py_vollib.black_scholes.black_scholes(flag, S, K, T, r, sigma)
# iv = py_vollib.black_scholes.implied_volatility(price, S, K, T, r, flag)

print(price)
