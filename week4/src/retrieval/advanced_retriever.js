import { cosineSimilarity } from "./similarity.js";
import { mmr } from "./mmr.js";

export function retrieve(queryVec, store, topK = 5, threshold = 0.2) {
  const scored = store
    .map(item => ({
      ...item,
      score: cosineSimilarity(queryVec, item.embedding)
    }))
    .filter(item => item.score > threshold)
    .sort((a, b) => b.score - a.score);

  return mmr(queryVec, scored, 0.7, topK);
}
