class Log {
  constructor(options = {}) {
    this.options = options;
    this.aip = null;
  }

  async initialize(aipInstance) {
    this.aip = aipInstance;
    return this;
  }

  // eslint-disable-next-line
  log(...data) {
    console.log(...data);
  }

  // eslint-disable-next-line
  info(...data) {
    console.info(...data);
  }

  // eslint-disable-next-line
  error(...data) {
    console.error(...data);
  }
}

export default Log;
