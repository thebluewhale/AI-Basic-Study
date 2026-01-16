import express from "express";
import OpenAI from "openai";
import fs from "fs";
import { cosineSimilarity } from "./utils/vector.js";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "07_frontend.html"));
});

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  const store = JSON.parse(fs.readFileSync("vector_store.json"));

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
    Answer ONLY using the context.
    If not found, say "I don't know."

    Context:
    ${context}

    Question: ${question}
    `;

  const answer = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  res.json({
    answer : answer.choices[0].message.content,
    refer : scored[0].text
   });
});

app.listen(3000, () => {
  console.log("RAG server running at http://localhost:3000");
});
