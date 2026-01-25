from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=api_key)

# ② 
response = client.chat.completions.create(
  model="gpt-4o-mini",
  temperature=0.9,  # ③
  # messages=[
  #   {"role": "system", "content": "너는 유치원 학생이야. 유치원생처럼 답변해줘."},
  #   {"role": "user", "content": "참새"},
  #   {"role": "assistant", "content": "짹짹"},
  #   {"role": "user", "content": "오리"},
  # ]		# ④
  messages = [
      {"role": "system", "content": "you are helpful asssitant"},
      {"role": "user", "content": "다음 글의 스타일을 반영해, “강아지”에 대한 글을 작성해 주세요. - 예시: 고양이는 독립적인 성향이 강합니다. 그들은 홀로 시간을 보내는 것을 즐기며, 때로는 주인의 관심이나 도움 없이도 잘 지낼 수 있습니다."},
  ]
)

print(response)

print('----')	# ⑤
print(response.choices[0].message.content) 