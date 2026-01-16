import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const question = "If a browser loads 5 scripts and 2 fail, how many succeed?";

  const prompt = `
Solve step by step.

Question:
${question}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  console.log(res.choices[0].message.content);
}

run();
