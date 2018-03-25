import DiskLogAdapter from 'aip-disk-log-adapter';
import JSONStoreAdapter from 'aip-json-store-adapter';
import getConfig, { getEnvConfig, initializeAdapters } from './config';
import BaseLogAdapter from './adapters/log/baseLogAdapter';
import BaseStoreAdapter from './adapters/store/baseStoreAdapter';
import BaseFilterAdapter from './adapters/filter/baseFilterAdapter';


describe('Config', () => {
  describe('Env config', () => {
    it('should get default env Config', (done) => {
      const conf = getEnvConfig();
      expect(conf).toEqual({
        storeAdapterName: 'aip-json-store-adapter',
        storeAdapterConfig: {},
        logAdapterName: 'aip-disk-log-adapter',
        logAdapterConfig: {},
        filterAdapterName: './adapters/filter/baseFilterAdapter',
        filterAdapterConfig: {},
        privateKeyPath: '',
        clientPublicKeyPath: '',
      });
      done();
    });

    it('should get env Config', (done) => {
      process.env.AIP_STORE_ADAPTER = 'custom-store-adapter';
      process.env.AIP_STORE_ADAPTER_CONFIG = '{}';
      process.env.AIP_LOG_ADAPTER = 'custom-log-adapter';
      process.env.AIP_LOG_ADAPTER_CONFIG = '{}';
      process.env.AIP_FILTER_ADAPTER = 'custom-filter-adapter';
      process.env.AIP_FILTER_ADAPTER_CONFIG = '{}';
      process.env.AIP_SERVER_PRIVATE_KEY_PATH = '/some/private/key/path.pem';
      process.env.AIP_CLIENT_PUBLIC_KEY_PATH = '/some/public/key/path.pem';

      const conf = getEnvConfig();

      expect(conf).toEqual({
        storeAdapterName: 'custom-store-adapter',
        storeAdapterConfig: {},
        logAdapterName: 'custom-log-adapter',
        logAdapterConfig: {},
        filterAdapterName: 'custom-filter-adapter',
        filterAdapterConfig: {},
        privateKeyPath: '/some/private/key/path.pem',
        clientPublicKeyPath: '/some/public/key/path.pem',
      });

      process.env = {};
      done();
    });
  });

  it('should initialize adapters', (done) => {
    const conf = initializeAdapters({
      storeAdapterName: './adapters/store/baseStoreAdapter',
      logAdapterName: './adapters/log/baseLogAdapter',
      filterAdapterName: './adapters/filter/baseFilterAdapter',
      storeAdapterConfig: {},
      logAdapterConfig: {},
      filterAdapterConfig: {},
    });

    expect(conf.logAdapter).toBeInstanceOf(BaseLogAdapter);
    expect(conf.storeAdapter).toBeInstanceOf(BaseStoreAdapter);
    expect(conf.filterAdapter).toBeInstanceOf(BaseFilterAdapter);
    done();
  });

  it('should get an default AIP config', (done) => {
    const conf = getConfig();

    expect(conf.logAdapter).toBeInstanceOf(DiskLogAdapter);
    expect(conf.storeAdapter).toBeInstanceOf(JSONStoreAdapter);
    expect(conf.filterAdapter).toBeInstanceOf(BaseFilterAdapter);
    done();
  });

  it('should get an AIP config', (done) => {
    const conf = getConfig({
      storeAdapterName: './adapters/store/baseStoreAdapter',
      logAdapterName: './adapters/log/baseLogAdapter',
      filterAdapterName: './adapters/filter/baseFilterAdapter',
      storeAdapterConfig: {},
      logAdapterConfig: {},
      filterAdapterConfig: {},
    });

    expect(conf.logAdapter).toBeInstanceOf(BaseLogAdapter);
    expect(conf.storeAdapter).toBeInstanceOf(BaseStoreAdapter);
    expect(conf.filterAdapter).toBeInstanceOf(BaseFilterAdapter);
    done();
  });
});
