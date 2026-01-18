import { embed } from "../embeddings/embedder.js";
import { retrieve } from "../retrieval/advanced_retriever.js";
import { buildContext } from "../context/context_builder.js";
import { ragPrompt } from "../prompts/templates.js";
import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runRAG(question, store) {
  const qVec = await embed(question);
  const hits = retrieve(qVec, store);
  const context = buildContext(hits);

  const prompt = ragPrompt(context, question);

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return res.choices[0].message.content;
}
