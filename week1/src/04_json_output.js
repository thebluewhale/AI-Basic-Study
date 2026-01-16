import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const text = `
WebGPU is a new web standard that provides low-level access to GPU.
`;

async function run() {
  const prompt = `
Return JSON only.

Schema:
{
  "summary": string,
  "keywords": string[]
}

Text:
${text}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  console.log(res.choices[0].message.content);
}

run();
