import { client } from "../llm/client.js";
import { plannerPrompt } from "../prompts/planner_prompt.js";

export async function plan(goal) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a planner." },
      { role: "user", content: plannerPrompt(goal) }
    ],
    response_format: { type: "json_object" }
  });

  const parsed = JSON.parse(res.choices[0].message.content);
  return parsed.steps;
}
