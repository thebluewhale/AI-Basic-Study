export function plannerPrompt(goal) {
  return `
You are a task planner.

Break the following goal into clear, executable steps.
Each step should be atomic.

Return JSON:

{
  "steps": [
    "step 1",
    "step 2",
    ...
  ]
}

Goal:
${goal}
`;
}
