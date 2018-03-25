import BaseLogAdapter from './adapters/log/baseLogAdapter';
import BaseStoreAdapter from './adapters/store/baseStoreAdapter';
import BaseFilterAdapter from './adapters/filter/baseFilterAdapter';
import API from './api/api';
import RSA from './rsa';

class AulaIdentityProvider {
  constructor(options) {
    this.log = options.logAdapter || new BaseLogAdapter();
    this.store = options.storeAdapter || new BaseStoreAdapter();
    this.filter = options.filterAdapter || new BaseFilterAdapter({ customFilter: d => d });

    this.api = new API();

    this.rsa = new RSA({
      privateKeyPath: options.privateKeyPath,
      clientPublicKeyPath: options.clientPublicKeyPath,
    });
  }

  async start() {
    await this.log.initialize(this);

    this.rsa.initialize();
    this.rsa.setLogger(this.log);
    await this.store.initialize(this);
    await this.api.start(this);

    this.log.log('Aula Indentity provider started');
  }
}

export default AulaIdentityProvider;
