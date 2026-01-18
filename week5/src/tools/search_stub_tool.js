export const searchStubTool = {
  name: "search",
  description: "Searches the web (stub).",
  schema: {
    query: "string"
  },
  run: async (args) => {
    return `Search results for "${args.query}": [result1, result2, result3]`;
  }
};
