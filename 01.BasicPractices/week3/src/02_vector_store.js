import OpenAI from "openai";
import "dotenv/config";
import fs from "fs";
import path from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const docs = [
  "WebGPU enables GPU access from the web.",
  "Chromium is an open-source browser engine.",
  "RAG improves LLM accuracy.",
  "Vector databases store embeddings."
];

async function run() {
  const store = [];

  for (let i = 0; i < docs.length; i++) {
    const emb = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: docs[i]
    });

    store.push({
      id: i,
      text: docs[i],
      embedding: emb.data[0].embedding
    });
  }

  fs.writeFileSync("vector_store.json", JSON.stringify(store, null, 2));
  console.log("Saved local vector store!");
}

run();
