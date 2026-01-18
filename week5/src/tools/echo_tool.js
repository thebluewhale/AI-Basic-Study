export const echoTool = {
  name: "echo",
  description: "Repeats the given message.",
  run: async (args) => {
    return `Echo: ${args.message}`;
  }
};
