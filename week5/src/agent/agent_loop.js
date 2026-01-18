import { client } from "../llm/client.js";
import { agentSystemPrompt } from "../prompts/agent_prompts.js";
import { ToolRouter } from "./tool_router.js";

export async function runAgent({ goal, tools, maxSteps = 6 }) {
  const state = [];
  const router = new ToolRouter(tools);

  const systemPrompt = agentSystemPrompt(tools);

  state.push({ role: "system", content: systemPrompt });
  state.push({ role: "user", content: `Goal: ${goal}` });

  for (let i = 0; i < maxSteps; i++) {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: state,
      response_format: { type: "json_object" }
    });

    const msg = res.choices[0].message.content;
    const parsed = JSON.parse(msg);

    console.log(`\n🧠 Thought: ${parsed.thought}`);

    const { name, args } = parsed.action;

    if (name === "finish") {
      console.log("\n✅ Final Answer:", args.answer);
      return args.answer;
    }

    let observation;
    try {
      observation = await router.run(parsed.action);
    } catch (e) {
      observation = `Error: ${e.message}`;
    }

    console.log(`🔧 Action: ${name}`);
    console.log(`👀 Observation: ${observation}`);

    state.push({ role: "assistant", content: msg });
    state.push({
      role: "user",
      content: `Observation: ${observation}`
    });
  }

  throw new Error("Agent did not finish in time.");
}
