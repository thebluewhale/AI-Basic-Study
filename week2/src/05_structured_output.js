import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const text = "WebGPU enables high-performance graphics on the web.";

  const prompt = `
Return JSON only.

Schema:
{
  "summary": string,
  "risk_level": "low" | "medium" | "high",
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
