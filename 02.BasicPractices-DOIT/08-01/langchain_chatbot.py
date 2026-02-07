from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")  # 환경 변수에서 API 키 가져오기

model = ChatOpenAI(model="gpt-4o-mini", api_key=api_key)

from langchain_core.messages import HumanMessage
print(model.invoke([HumanMessage(content="hello guy")]))