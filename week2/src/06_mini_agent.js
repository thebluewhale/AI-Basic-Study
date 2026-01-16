import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const task = `
Analyze the following text:
1. Summarize
2. Extract keywords
3. Assess risks

Text:
WebGPU allows browsers to access GPU features.
`;

  const prompt = `
You are an agent. Follow this process:
1. Plan
2. Execute
3. Validate
4. Output in JSON

${task}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  console.log(res.choices[0].message.content);
}

run();
