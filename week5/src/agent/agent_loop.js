import { plan } from "./planner.js";
import { executeStep } from "./executor.js";

export async function runAgent(args) {
  let goal = args.goal;
  let tools = args.tools;
  const steps = await plan(goal);
  console.log("🗺 Plan:", steps);

  const toolMap = new Map(tools.map(t => [t.name, t]));

  const results = [];

  for (const step of steps) {
    console.log(`\n▶ Executing: ${step}`);

    const res = await executeStep(step, tools, toolMap);

    if (res.done) {
      results.push(res.result);
      continue;
    }

    console.log("👀 Observation:", res.observation);
    results.push(res.observation);
  }

  console.log("\n✅ Final Output:");
  console.log(results.join("\n"));
}
