export class Memory {
  constructor({ store, summarizer }) {
    this.store = store;
    this.summarizer = summarizer;
    this.shortTerm = [];
  }

  addShortTerm(entry) {
    console.log("addShortTerm : " + entry)
    this.shortTerm.push(entry);
  }

  getShortTerm() {
    return this.shortTerm;
  }

  async commitLongTerm() {
    const summary = await this.summarizer.summarize(this.shortTerm);
    await this.store.save(summary);
    this.shortTerm = [];
  }

  async recall(query) {
    return this.store.search(query);
  }
}
