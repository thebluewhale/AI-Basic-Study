export function ragPrompt(context, question) {
  return `
You are a precise technical assistant.
Answer ONLY using the provided context.
If not found, say "I don't know".

Context:
${context}

Question:
${question}
`;
}
