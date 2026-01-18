export class ToolRouter {
  constructor(tools) {
    this.map = new Map(tools.map(t => [t.name, t]));
  }

  async run(action) {
    const tool = this.map.get(action.name);
    if (!tool) {
      throw new Error(`Unknown tool: ${action.name}`);
    }
    return await tool.run(action.args);
  }
}
