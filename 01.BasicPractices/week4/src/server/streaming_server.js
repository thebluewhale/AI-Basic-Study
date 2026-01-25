import express from "express";
import fs from "fs";
import { runRAG } from "../rag/rag_pipeline.js";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = JSON.parse(fs.readFileSync("vector_store.json"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend.html"));
});

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  const answer = await runRAG(question, store);
  res.json({ answer });
});

app.listen(3000, () => {
  console.log("Advanced RAG running on http://localhost:3000");
});

