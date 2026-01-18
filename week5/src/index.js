import { runAgent } from "./agent/agent_loop.js";
import { echoTool } from "./tools/echo_tool.js";
import { mathTool } from "./tools/math_tool.js";
import { multiplyTool } from "./tools/multiply_tool.js";
import { searchStubTool } from "./tools/search_stub_tool.js";

async function main() {
  await runAgent({
    goal: "Search WebGPU and then say hello and calculate 3 * 4",
    tools: [echoTool, mathTool, searchStubTool, multiplyTool]
  });
}

main();
