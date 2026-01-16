import OpenAI from "openai";
import "dotenv/config";
import fs from "fs";
import { cosineSimilarity } from "./utils/vector.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const store = JSON.parse(fs.readFileSync("vector_store.json"));
  const question = "Explain WebGPU";

  const emb = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: question
  });

  const queryVec = emb.data[0].embedding;

  const scored = store
    .map(item => ({
      ...item,
      score: cosineSimilarity(queryVec, item.embedding)
    }))
    .sort((a, b) => b.score - a.score);

  const context = scored.slice(0, 2).map(s => s.text).join("\n");

  const prompt = `

Use the context below to answer.

Context : ${context}

Question: ${question}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  console.log(res.choices[0].message.content);
}

run();
