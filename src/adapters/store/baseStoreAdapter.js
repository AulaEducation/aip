class Store {
  constructor(options = {}) {
    this.options = options;
    this.type = 'base';
    this.aip = null;
  }

  async initialize(aipInstance) {
    this.aip = aipInstance;
    return this;
  }

  // eslint-disable-next-line
  async getIdentity(id) {
    return null;
  }
}

export default Store;
