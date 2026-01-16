import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run(temp) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: temp,
    messages: [
      { role: "user", content: "Give me a creative metaphor for a browser engine." }
    ]
  });

  console.log(`\nTemperature = ${temp}`);
  console.log(res.choices[0].message.content);
}

await run(0.1);
await run(0.9);
