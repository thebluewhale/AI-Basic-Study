export const multiplyTool = {
  name: "multiply",
  description: "Multiply two numbers.",
  schema: {
    a: "number",
    b: "number"
  },
  run: async (args) => {
    return args.a * args.b;
  }
};
