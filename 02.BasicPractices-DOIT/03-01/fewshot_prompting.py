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
  #   {"role": "user", "content": "말"},
  #   {"role": "assistant", "content": "히이잉"},
  #   {"role": "user", "content": "개구리"},
  #   {"role": "assistant", "content": "개굴개굴"},
  #   {"role": "user", "content": "뱀"},
  # ]		# ④
  messages = [
      {"role": "system", "content": "you are helpful assistant"},
      {"role": "user", "content" :
                          "- 그 사람에게 반했어. 그 사람은 정말 멋지고 매력적이야: [분석] 긍정적, 열정," \
                          "- 사랑이란 건 정말 복잡해. 때로는 행복하고 때로는 아프다: [분석] 복합적, 갈등" \
                          "- 우리가 헤어진 후, 나는 사랑이란 더 이상 믿을 것이 못 된다고 느껴: [분석] 부정적, 실망감" \
                          "앞선 예시와 마찬가지로, 다음 문장을 분석해 주세요." \
                          "- 사랑은 때로는 어려움을 안겨주지만, 그 어려움을 함께 극복하는 게 가장 중요한 거야:"}
  ]
)

print(response)

print('----')	# ⑤
print(response.choices[0].message.content) 