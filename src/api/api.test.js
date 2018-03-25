import API from './api';

const routerCount = 3;

describe('API and server', () => {
  it('should construct an API instance', (done) => {
    const api = new API();
    expect(api).toBeInstanceOf(API);
    done();
  });

  it('should bind routes', (done) => {
    const api = new API();
    expect(api).toBeInstanceOf(API);
    api.aip = { rsa: {} };
    api.bindRoutes();
    expect(api.app._router.stack.find(r => r.name === 'errorHandler')).toBeTruthy();
    expect(api.app._router.stack.find(r => r.name === 'notFoundHandler')).toBeTruthy();
    expect(api.app._router.stack.find(r => r.name === 'corsMiddleware')).toBeTruthy();
    expect(api.app._router.stack.find(r => r.name === 'textParser')).toBeTruthy();
    expect(api.app._router.stack.filter(r => r.name === 'router')).toHaveLength(routerCount);
    done();
  });

  it('should start', (done) => {
    const api = new API();
    expect(api).toBeInstanceOf(API);
    const aip = { rsa: {} };
    api.app.listen = (port, cb) => {
      expect(port).toBe(4242);
      cb();
    };

    const res = api.start(aip);
    expect(res).toBeInstanceOf(Promise);
    res.then(() => {
      expect(api.app._router.stack.find(r => r.name === 'errorHandler')).toBeTruthy();
      expect(api.app._router.stack.find(r => r.name === 'notFoundHandler')).toBeTruthy();
      expect(api.app._router.stack.find(r => r.name === 'corsMiddleware')).toBeTruthy();
      expect(api.app._router.stack.find(r => r.name === 'textParser')).toBeTruthy();
      expect(api.app._router.stack.filter(r => r.name === 'router')).toHaveLength(routerCount);
      done();
    });
  });

  it('should decryptAndVerify', () => {
    const mockDecrypt = jest.fn();

    const api = new API();
    api.aip = { rsa: { decryptAndVerify: mockDecrypt } };
    api.decryptAndVerify('');
    expect(mockDecrypt).toHaveBeenCalled();
  });

  it('should encryptAndSign', () => {
    const mockEncrypt = jest.fn();

    const api = new API();
    api.aip = { rsa: { encryptAndSign: mockEncrypt } };
    api.encryptAndSign('');
    expect(mockEncrypt).toHaveBeenCalled();
  });
});
