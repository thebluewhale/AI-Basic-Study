import express from "express";
import OpenAI from "openai";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "06_frontend.html"));
});

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: question }]
  });

  res.json({
    answer: response.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
