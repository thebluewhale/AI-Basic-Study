export class AgentState {
  constructor() {
    this.history = [];
  }

  add(entry) {
    this.history.push(entry);
  }

  getMessages() {
    return this.history;
  }
}
