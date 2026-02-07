from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
# from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")  # 환경 변수에서 API 키 가져오기

llm = ChatOpenAI(model="gpt-4o-mini", api_key=api_key)
parser = StrOutputParser()

# messages = [
#     SystemMessage(content="너는 미녀와 야수에 나오는 미녀야. 그 캐릭터에 맞게 사용자와 대화해"),
#     HumanMessage(content="안녕? 저는 개스톤입니다. 오늘 시간 괜찮으시면 저와 저녁 같이 먹을까요?"),
# ]

# result = llm.invoke(messages)
# print(parser.invoke(result))

# chain = llm | parser
# print(chain.invoke(messages))

system_template = "너는 {story}에 나오는 {character_a}야. 그 캐릭터에 맞게 사용자와 대화해"
human_template = "안녕? 저는 {character_b}입니다. 오늘 시간 괜찮으시면 저와 {activity} 같이 할까요?"

prompt_template = ChatPromptTemplate([
    ("system", system_template),
    ("user", human_template)
])

# result = prompt_template.invoke({
#     "story": "미녀와 야수",
#     "character_a": "미녀",
#     "character_b": "야수",
#     "activity": "저녁"
# })

# print(result)

chain = prompt_template | llm | parser
print(chain.invoke({
    "story": "미녀와 야수",
    "character_a": "미녀",
    "character_b": "야수",
    "activity": "저녁"
}))