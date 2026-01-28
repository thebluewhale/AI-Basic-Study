import base64
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")  # 환경 변수에서 API 키를 가져오기

client = OpenAI(api_key=api_key)  # 오픈AI 클라이언트의 인스턴스 생성

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")
    
image_01_path = "./data/iu_01.jpg"
image_02_path = "./data/iu_02.jpg"

# 이미지를 base64로 인코딩
image_01_base64_image = encode_image(image_01_path)
image_02_base64_image = encode_image(image_02_path)

single_image_explanation_request_messages = [
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "이 이미지에 대해 설명해주세요."},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{image_01_base64_image}",
                },
            },
        ],
    }
]

two_image_diff_explanation_request_messages = [
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "두 이미지의 차이에 대해 설명해주세요."},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{image_01_base64_image}",
                },
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{image_02_base64_image}",
                },
            },
        ],
    }
]

response = client.chat.completions.create(
    model="gpt-4o-mini",  # 응답 생성에 사용할 모델 지정
    messages=two_image_diff_explanation_request_messages # 대화 기록을 입력으로 전달
)

print(response.choices[0].message.content)