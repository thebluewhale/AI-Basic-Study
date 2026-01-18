export const mathTool = {
  name: "add",
  description: "Adds two numbers.",
  schema: {
    a: "number",
    b: "number"
  },
  run: async (args) => {
    return args.a + args.b;
  }
};
