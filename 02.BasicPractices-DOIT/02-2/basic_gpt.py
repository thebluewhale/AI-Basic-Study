from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('OPEN_API_KEY')
client = OpenAI(api_key=api_key)

# ② 
response = client.chat.completions.create(
  model="gpt-4o-mini",
  temperature=0.1,  # ③
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "2018년 월드컵 우승팀은 어디야?"},
  ]		# ④
)

print(response)

print('----')	# ⑤
print(response.choices[0].message.content) 