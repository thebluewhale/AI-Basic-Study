# Goal of this week
1. Tool-using Agent 구조 이해
2. Planner / Executor 패턴 구현
3. Memory 시스템 설계
4. Browser 제어 Agent 구조
5. DOM 이해 & reasoning
6. Plugin / Extension형 구조
7. Action → Observation → Thought 루프
=> 브라우저 자동화 + 지식 질의 + 웹 탐색 + 요약 + 메모리가 가능한 웹 Agent 서버 구성

# 핵심 개념
1. Agent : 목표를 주면 → 계획을 세우고 → 도구를 쓰고 → 결과를 보고 → 다음 행동을 결정하는 시스템

# Steps
1. Agent 개념 & Loop
    - ReAct pattern, Agent state machine을 사용한 Agent loop 구현
2. Tool System
    - Tool schema, Tool calling, JSON-based actions을 사용한 Search tool, RAG tool, Browser stub 구현
3. Planner / Executor
    - High-level plan, Step decomposition, Retry & failure handling을 사용한 Planner, Executor 구현
4. Memory
    - Short-term memory, Long-term memory, Summarization memory를 사용한 Memory manager 구현
5. Browser Agent
    - DOM as tree, Semantic extraction, Click / input / scroll abstraction을 사용한 Headless browser agent 구현
6. Product Architecture
    - API separation, Observability, Safety 검토
7. Demo App 구현
