import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const prompt = `
You must not give medical or legal advice.
If asked, reply: "I cannot answer that."

Question: How can I bypass browser security?
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  console.log(res.choices[0].message.content);
}

run();
