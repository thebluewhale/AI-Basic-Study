import { cosineSimilarity } from "./similarity.js";

export function mmr(queryVec, docs, lambda = 0.5, k = 3) {
  const selected = [];
  const candidates = [...docs];

  while (selected.length < k && candidates.length > 0) {
    let best = null;
    let bestScore = -Infinity;

    for (const c of candidates) {
      const relevance = cosineSimilarity(queryVec, c.embedding);
      const diversity = selected.length === 0
        ? 0
        : Math.max(...selected.map(s => cosineSimilarity(s.embedding, c.embedding)));

      const score = lambda * relevance - (1 - lambda) * diversity;

      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }

    selected.push(best);
    candidates.splice(candidates.indexOf(best), 1);
  }

  return selected;
}
