import { client } from "../llm/client.js";
import { executorPrompt } from "../prompts/executor_prompt.js";

export async function executeStep(step, tools, toolMap) {
  const prompt = executorPrompt(step, tools);

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });

  const parsed = JSON.parse(res.choices[0].message.content);

  if (parsed.action.name === "finish") {
    return { done: true, result: parsed.action.args.result };
  }

  const tool = toolMap.get(parsed.action.name);
  const observation = await tool.run(parsed.action.args);

  return {
    done: false,
    observation
  };
}
