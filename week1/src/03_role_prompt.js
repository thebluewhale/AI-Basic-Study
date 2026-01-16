import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run(role) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: `You are a ${role}.` },
      { role: "user", content: "Explain what WebGPU is." }
    ]
  });

  console.log(`\nRole = ${role}`);
  console.log(res.choices[0].message.content);
}

await run("strict professor");
await run("friendly tutor");
await run("senior web engine developer");