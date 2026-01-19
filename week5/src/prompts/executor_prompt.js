export function executorPrompt(step, tools) {
  return `
You are an executor.

Current step:
${step}

You can use the following tools:
${tools.map(t => `- ${t.name}: ${t.description}`).join("\n")}

Return JSON:

{
  "thought": "...",
  "action": {
    "name": "tool_name",
    "args": { ... }
  }
}

Or if done:

{
  "thought": "...",
  "action": {
    "name": "finish",
    "args": { "result": "..." }
  }
}
`;
}
