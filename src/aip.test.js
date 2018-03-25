import AIP from './aip';
import BaseLogAdapter from './adapters/log/baseLogAdapter';
import BaseStoreAdapter from './adapters/store/baseStoreAdapter';
import BaseFilterAdapter from './adapters/filter/baseFilterAdapter';
import API from './api/api';
import RSA from './rsa';

describe('AIP', () => {
  it('should construct an AIP instance', (done) => {
    const aip = new AIP({});
    expect(aip).toBeInstanceOf(AIP);
    expect(aip.api).toBeInstanceOf(API);
    expect(aip.rsa).toBeInstanceOf(RSA);
    expect(aip.log).toBeInstanceOf(BaseLogAdapter);
    expect(aip.store).toBeInstanceOf(BaseStoreAdapter);
    expect(aip.filter).toBeInstanceOf(BaseFilterAdapter);
    done();
  });

  const privateKeyPath = '/dummy/path/key.pem';
  const clientPublicKeyPath = '/dummy/path/key.client.public.pem';
  const log = { initialize: jest.fn(), log: jest.fn() };
  const store = { initialize: jest.fn(), log: jest.fn() };
  const filter = { initialize: jest.fn(), log: jest.fn() };

  const aip = new AIP({
    privateKeyPath,
    clientPublicKeyPath,
    logAdapter: log,
    storeAdapter: store,
    filterAdapter: filter,
  });

  aip.api = { start: jest.fn() };

  it('should construct an AIP instance with options', (done) => {
    expect(aip.rsa.privateKeyPath).toBe(privateKeyPath);
    expect(aip.rsa.clientPublicKeyPath).toBe(clientPublicKeyPath);
    expect(aip.log).toBe(log);
    expect(aip.store).toBe(store);
    expect(aip.filter).toBe(filter);
    done();
  });

  it('should start the AIP', async (done) => {
    const rsa = { initialize: jest.fn(), setLogger: jest.fn() };
    aip.rsa = rsa;

    await aip.start();

    expect(aip.rsa.initialize).toHaveBeenCalled();
    expect(aip.rsa.setLogger).toHaveBeenCalledWith(log);
    expect(aip.log.initialize).toHaveBeenCalledWith(aip);
    expect(aip.store.initialize).toHaveBeenCalledWith(aip);
    expect(aip.api.start).toHaveBeenCalledWith(aip);
    done();
  });
});
