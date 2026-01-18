# Goal of this week
1. Chunking 전략 이해 & 구현
2. 문서 로더 구조화 (PDF/HTML/MD)
3. 검색 품질 개선 (MMR, threshold)
4. Context window 최적화
5. 캐시 설계
6. Streaming 응답
7. 제품형 RAG 구조

# 핵심 개념
1. Chunking : 검색 정확도를 좌우함
2. Overlap : 문맥 손실 방지
3. MMR : 중복 제거 + 다양성 (similarity, similarity_score_threshold 등도 있음)
4. Score Threshold : 쓰레기 문서 차단
5. Context Packing : 토큰 절약
6. Prompt Template : Hallucination 방지
7. Cache : 속도 & 비용 최적화
8. Streaming : UX 개선
9. Metadata Filtering : 실무 필수

# Rag pipeline

[ 문서 수집 ]
　　↓
[ 문서 파싱 ]
　　↓
[ 문서 청킹 ]
　　↓
[ 임베딩 (문서 청크들) ]
　　↓
[ 벡터 DB 저장 ] ←───────────┐
　　　　　　　　　　　　　　　　　　　│
  사용자 질문　　　　　　　　　　　　　　↓
　　　↓　　　　　　　　　　　　　[ 문서 검색 ]
[ 질문 임베딩 ]　　　　　　　　　　(유사 문서 Top-K)
　　　↓　　　　　　　　　　　　　　　↓
[ 벡터 DB 검색 ] ─────────→ [ 관련 문서 ]
　　　　　　　　　　　　　　　　　　　↓
　　　　　　　　　　　　　　　　[ LLM + 문서 + 질문 ]
　　　　　　　　　　　　　　　　　　　↓
　　　　　　　　　　　　　　　　[ 답변 생성 및 제공 ]
