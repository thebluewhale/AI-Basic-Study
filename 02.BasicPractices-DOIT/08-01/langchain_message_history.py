from dotenv import load_dotenv
import os
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")  # 환경 변수에서 API 키 가져오기

llm = ChatOpenAI(model="gpt-4o-mini", api_key=api_key)

store = {}

# 세션 ID에 따라 대화 기록을 가져옴
def get_session_history(session_id: str):
    if session_id not in store:
        print("새 session 생성")
        store[session_id] = InMemoryChatMessageHistory()
    else:
        print("존재하는 session 가져오기")

    return store[session_id]

with_message_history = RunnableWithMessageHistory(llm, get_session_history)

config = {"configurable": {"session_id": "abc2"}}

for r in with_message_history.stream(
    [HumanMessage(content="대한민국의 국가를 불러줘")],
    config = config,
):

    print(r.content, end="|")