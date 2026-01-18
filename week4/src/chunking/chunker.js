export function chunkText(text, size = 200, overlap = 50) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = start + size;
    const chunk = text.slice(start, end);
    chunks.push(chunk);
    start += size - overlap;
  }

  return chunks;
}
