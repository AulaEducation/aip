import ldap from 'ldapjs';

class LDAPStoreAdapter {
  constructor(options = {}) {
    this.type = 'ldap';
    this.aip = null;
    this.ldapClient = null;
    this.url = options.url || '';
    this.dn = options.dn || '';
    this.secret = options.secret || '';
    this.filter = options.filter || '';
    this.scope = options.scope || '';
    this.searchBase = options.searchBase || '';

    this.getIdentity = this.getIdentity.bind(this);
  }

  async initialize(aipInstance) {
    this.aip = aipInstance;

    this.ldapClient = ldap.createClient({
      url: this.url,
    });

    await new Promise((resolve, reject) => {
      this.ldapClient.bind(this.dn, this.secret, (err) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve();
      });
    });


    return this;
  }

  async getIdentity(id) {
    const opts = {
      filter: this.filter.replace('{{{ id }}}', id),
      scope: this.scope,
    };

    const user = await new Promise((resolve, reject) => {
      this.ldapClient.search(this.searchBase, opts, (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        let entry = null;
        res.on('searchEntry', (e) => {
          entry = e.object;
        });
        res.on('error', (error) => {
          console.error('error:', error.message);
          reject(error);
        });

        res.on('end', () => {
          resolve(entry);
        });
      });
    });

    return user;
  }
}

export default LDAPStoreAdapter;
