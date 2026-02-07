from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
import os
from langchain_openai import ChatOpenAI

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")  # 환경 변수에서 API 키 가져오기

llm = ChatOpenAI(model="gpt-4o-mini", api_key=api_key)

messages = [
    SystemMessage("너는 사용자를 도와주는 상담사야.")
]

while True:
    user_input = input("사용자 : ")

    if user_input == "exit":
        break

    messages.append(
        HumanMessage(user_input)
    ) # 사용자 메시지를 대화 기록에 추가

    ai_response = llm.invoke(messages)

    messages.append(
        ai_response
    ) #대화 기록에 AI 응답 추가

    print("AI : " + ai_response.content)