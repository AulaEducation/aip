import fs from 'fs-extra';

class DiskLogAdapter {
  constructor(options = {}) {
    this.useConsole = options.useConsole || false;
    this.withTimestamp = options.withTimestamp || false;

    this.outLogPath = options.outLogPath || './logs/out.log';
    this.infoLogPath = options.infoLogPath || './logs/info.log';
    this.errorLogPath = options.errorLogPath || './logs/error.log';

    this.outLogStream = null;
    this.infoLogStream = null;
    this.errorLogStream = null;

    this.aip = null;
  }

  async initialize(aipInstance) {
    this.aip = aipInstance;

    fs.ensureFileSync(this.outLogPath);
    fs.ensureFileSync(this.infoLogPath);
    fs.ensureFileSync(this.errorLogPath);

    this.outLogStream = fs.createWriteStream(this.outLogPath, { flags: 'a' });
    this.infoLogStream = fs.createWriteStream(this.infoLogPath, { flags: 'a' });
    this.errorLogStream = fs.createWriteStream(this.errorLogPath, { flags: 'a' });

    return this;
  }

  formatData(data) {
    let out = '';
    if (this.withTimestamp) {
      out = `${out}${Date.now()}: `;
    }
    out = `${out}${data.map(d => `${d}`).join(' ')}\n`;

    return out;
  }

  log(...data) {
    this.outLogStream.write(this.formatData(data));
    if (this.useConsole) {
      console.log(...data);
    }
  }

  info(...data) {
    this.infoLogStream.write(this.formatData(data));
    if (this.useConsole) {
      console.info(...data);
    }
  }

  error(...data) {
    this.errorLogStream.write(this.formatData(data));
    if (this.useConsole) {
      console.error(...data);
    }
  }
}

export default DiskLogAdapter;
