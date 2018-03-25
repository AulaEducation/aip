import fs from 'fs';
import NodeRSA from 'node-rsa';
import RSA from './rsa';

describe('RSA', () => {
  it('should construct an RSA instance', (done) => {
    const rsa = new RSA();
    expect(rsa).toBeInstanceOf(RSA);
    done();
  });

  it('should construct an RSA instance with options', (done) => {
    const privateKeyPath = '/dummy/path/key.pem';
    const clientPublicKeyPath = '/dummy/path/key.client.public.pem';
    const log = { log: jest.fn() };
    const rsa = new RSA({
      privateKeyPath,
      clientPublicKeyPath,
    }, log);
    expect(rsa.privateKeyPath).toBe(privateKeyPath);
    expect(rsa.clientPublicKeyPath).toBe(clientPublicKeyPath);
    expect(rsa.logger).toBe(log);
    expect(rsa.privateKey).toBeNull();
    expect(rsa.clientPublicKey).toBeNull();
    done();
  });

  describe('Load keys', () => {
    const privateKeyPath = '/dummy/path/key.pem';
    const clientPublicKeyPath = '/dummy/path/key.client.public.pem';

    const log = { log: jest.fn() };
    const rsa = new RSA({
      privateKeyPath,
      clientPublicKeyPath,
    }, log);

    it('should load a private key', (done) => {
      const rfs = fs.readFileSync;
      fs.readFileSync = jest.fn(); // mock temporarily readFileSync

      rsa.loadPrivateKey();
      expect(fs.readFileSync).toHaveBeenCalledWith(privateKeyPath);
      expect(rsa.privateKey).not.toBeNull();

      fs.readFileSync = rfs; // restore readFileSync
      done();
    });

    it('should load a public key', (done) => {
      const rfs = fs.readFileSync;
      fs.readFileSync = jest.fn(); // mock temporarily readFileSync

      rsa.loadClientPublicKey();
      expect(fs.readFileSync).toHaveBeenCalledWith(clientPublicKeyPath);
      expect(rsa.clientPublicKey).not.toBeNull();

      fs.readFileSync = rfs; // restore readFileSync
      done();
    });
  });

  it('should initialize', (done) => {
    const privateKeyPath = '/dummy/path/key.pem';
    const clientPublicKeyPath = '/dummy/path/key.client.public.pem';

    const log = { log: jest.fn() };
    const rsa = new RSA({
      privateKeyPath,
      clientPublicKeyPath,
    }, log);

    const rfs = fs.readFileSync;
    fs.readFileSync = jest.fn(); // mock temporarily readFileSync

    rsa.initialize();

    expect(fs.readFileSync).toHaveBeenCalledWith(privateKeyPath);
    expect(rsa.privateKey).not.toBeNull();
    expect(fs.readFileSync).toHaveBeenCalledWith(clientPublicKeyPath);
    expect(rsa.clientPublicKey).not.toBeNull();

    fs.readFileSync = rfs; // restore readFileSync
    done();
  });

  it('should set a custom logger', (done) => {
    const log = { log: jest.fn() };
    const rsa = new RSA();
    expect(rsa.logger).toBe(console);
    rsa.setLogger(log);
    expect(rsa.logger).toBe(log);
    done();
  });

  describe('Encrypt/Decrypt and Sign/Verify', () => {
    const rsa = new RSA();
    rsa.privateKey = {
      sign: jest.fn(d => `|signed-${d}`),
      decrypt: jest.fn(d => d),
    };

    rsa.clientPublicKey = {
      encrypt: jest.fn(d => d),
      verify: jest.fn(() => true),
    };

    it('should encrypt a message', (done) => {
      const msg = 'hello';
      rsa.encrypt(msg);
      expect(rsa.clientPublicKey.encrypt).toHaveBeenCalledWith(msg, 'base64');
      done();
    });

    it('should sign a message', (done) => {
      const msg = 'hello';
      rsa.sign(msg);
      expect(rsa.privateKey.sign).toHaveBeenCalledWith(msg, 'base64');
      done();
    });

    it('should decrypt a message', (done) => {
      const msg = 'hello';
      rsa.decrypt(msg);
      expect(rsa.privateKey.decrypt).toHaveBeenCalledWith(msg, 'utf8');
      done();
    });

    it('should verify a message', (done) => {
      const msg = 'hello';
      const sig = '123';
      rsa.verify(msg, sig);
      expect(rsa.clientPublicKey.verify).toHaveBeenCalledWith(msg, sig, 'utf8', 'base64');
      done();
    });

    it('should encrypt and sign a message', (done) => {
      const msg = 'hello';
      const res = rsa.encryptAndSign(msg);
      expect(rsa.clientPublicKey.encrypt).toHaveBeenCalledWith(msg, 'base64');
      expect(rsa.privateKey.sign).toHaveBeenCalledWith(msg, 'base64');
      expect(res).toBe(`${msg}|signed-${msg}`);
      done();
    });

    it('should decrypt and verify a message', (done) => {
      const data = 'hello=123=';
      const res = rsa.decryptAndVerify(data);
      expect(rsa.privateKey.decrypt).toHaveBeenCalledWith('hello=', 'utf8');
      expect(rsa.clientPublicKey.verify).toHaveBeenCalledWith('hello=', '123=', 'utf8', 'base64');
      expect(res).toEqual({ message: 'hello=', verified: true });
      done();
    });
  });
});
