import yfinance as yf

# Samsung electronics에 대한 Ticker 객체 생성
# samsung = yf.Ticker("005930.KS")

# GOOGLE에 대한 Ticker 객체 생성
google = yf.Ticker("GOOGL")

# Ticker 객체에 대한 정보 출력 (.py에서 실행할 때는 print(msft.info)로 사용)
# print(msft.info)

# hist = samsung.history(period="5d") # 5일간의 주가 데이터를 가져옴
# print(hist) # 데이터 출력

print(google.recommendations) # 추천 정보 출력
