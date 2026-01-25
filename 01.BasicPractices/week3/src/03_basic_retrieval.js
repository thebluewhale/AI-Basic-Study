import OpenAI from "openai";
import "dotenv/config";
import fs from "fs";
import { cosineSimilarity } from "./utils/vector.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const store = JSON.parse(fs.readFileSync("vector_store.json"));
  const query = "What is WebGPU?";

  const emb = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  });

  const queryVec = emb.data[0].embedding;

  const scored = store.map(item => ({
    ...item,
    score: cosineSimilarity(queryVec, item.embedding)
  }));

  scored.sort((a, b) => b.score - a.score);

  console.log("Top results:");
  console.log(scored.slice(0, 2));
}

run();
