import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

class JSONStoreAdapter {
  constructor(options = {}) {
    this.dbPath = options.dbPath || 'db.json';
    this.type = 'json';
    this.aip = null;
    this.db = null;

    this.getIdentity = this.getIdentity.bind(this);
  }

  async initialize(aipInstance) {
    this.aip = aipInstance;

    const adapter = new FileSync(this.dbPath);
    this.db = low(adapter);
    this.db.defaults({ users: [], count: 0 }).write();

    return this;
  }

  async getIdentity(id) {
    return this.db
      .get('users')
      .find({ id })
      .value();
  }
}

export default JSONStoreAdapter;
