export function buildContext(chunks, maxChars = 1200) {
  let context = "";

  for (const c of chunks) {
    if ((context + c.text).length > maxChars) break;
    context += `- ${c.text}\n`;
  }

  return context;
}
