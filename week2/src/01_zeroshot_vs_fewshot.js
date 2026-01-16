import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const text = "WebGPU allows low-level GPU access from the web.";

  const zeroShot = `
Summarize this text:
${text}
`;

  const fewShot = `
Example:
Input: Apple released a new product.
Output: Apple launched a new product.

Now:
Input: ${text}
Output:
`;

  const zero = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: zeroShot }]
  });

  const few = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: fewShot }]
  });

  console.log("Zero-shot:", zero.choices[0].message.content);
  console.log("Few-shot:", few.choices[0].message.content);
}

run();
