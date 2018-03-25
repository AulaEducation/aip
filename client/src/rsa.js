import fs from 'fs';
import NodeRSA from 'node-rsa';

class RSA {
  constructor(options = {}) {
    this.privateKeyPath = options.privateKeyPath;
    this.clientPublicKeyPath = options.clientPublicKeyPath;

    this.privateKey = null;
    this.clientPublicKey = null;

    this.initialize();
  }

  initialize() {
    this.loadPrivateKey();
    this.loadClientPublicKey();
  }

  loadPrivateKey() {
    const keyContent = fs.readFileSync(this.privateKeyPath);
    this.privateKey = new NodeRSA(keyContent);
  }

  loadClientPublicKey() {
    const keyContent = fs.readFileSync(this.clientPublicKeyPath);
    this.clientPublicKey = new NodeRSA(keyContent);
  }

  encrypt(msg) {
    return this.clientPublicKey.encrypt(msg, 'base64');
  }

  sign(msg) {
    return this.privateKey.sign(msg, 'base64');
  }

  decrypt(msg) {
    return this.privateKey.decrypt(msg, 'utf8');
  }

  verify(msg, sig) {
    return this.clientPublicKey.verify(msg, sig, 'utf8', 'base64');
  }

  encryptAndSign(msg) {
    const signature = this.sign(msg);
    const encryptedMsg = this.encrypt(msg);

    return `${encryptedMsg}${signature}`;
  }

  decryptAndVerify(msg) {
    try {
      const parts = msg.split('=');

      const message = this.decrypt(parts[0]);
      const verified = this.verify(message, parts[1]);

      return {
        message,
        verified,
      };
    } catch (e) {
      return null;
    }
  }
}

export default RSA;
