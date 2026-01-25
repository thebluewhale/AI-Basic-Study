export class MemoryStore {
  constructor() {
    this.memories = [];
  }

  async save(summary) {
    this.memories.push({
      id: crypto.randomUUID(),
      summary,
      timestamp: Date.now()
    });
  }

  async search(query) {
    return this.memories.filter(m =>
      m.summary.toLowerCase().includes(query.toLowerCase())
    );
  }
}
