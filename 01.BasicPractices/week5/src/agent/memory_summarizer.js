import { memorySummaryPrompt } from "../prompts/memory_prompts.js";

export class MemorySummarizer {
  constructor(llm) {
    this.llm = llm;
  }

  async summarize(entries) {
    const text = entries.join("\n");
    const prompt = memorySummaryPrompt(text);
    return await this.llm.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  }
}
