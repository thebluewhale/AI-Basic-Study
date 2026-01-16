import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const text = "WebGPU allows high-performance graphics on the web.";

  const embedding = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  console.log("Vector length:", embedding.data[0].embedding.length);
}

run();
