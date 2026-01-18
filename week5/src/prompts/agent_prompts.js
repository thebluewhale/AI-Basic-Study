export function agentSystemPrompt(tools) {
  tools.map(t => console.log(t.name));
  return `
You are an autonomous agent.

You must follow this loop:
Thought → Action → Observation → Thought → ...

You can use the following tools:
${tools.map(t => `- ${t.name}: ${t.description}`).join("\n")}

Always respond in JSON format:

{
  "thought": "...",
  "action": {
    "name": "tool_name",
    "args": { ... }
  }
}

When you want to finish, use:

{
  "thought": "...",
  "action": {
    "name": "finish",
    "args": { "answer": "..." }
  }
}
`;
}
