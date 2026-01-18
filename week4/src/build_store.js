import fs from "fs";
import { loadText } from "./loaders/text_loader.js";
import { chunkText } from "./chunking/chunker.js";
import { embed } from "./embeddings/embedder.js";

async function run() {
  const text = loadText("data/sample_docs.txt");
  const chunks = chunkText(text, 400, 50);

  const store = [];

  for (let i = 0; i < chunks.length; i++) {
    const vec = await embed(chunks[i]);
    store.push({
      id: i,
      text: chunks[i],
      embedding: vec
    });
  }

  fs.writeFileSync("vector_store.json", JSON.stringify(store, null, 2));
  console.log("Vector store built:", store.length);
}

run();
