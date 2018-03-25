import axios from 'axios';
import RSA from './rsa';

class AIPClient {
  constructor(options = {}) {
    this.url = options.url;
    this.rsa = new RSA({
      privateKeyPath: options.privateKeyPath,
      clientPublicKeyPath: options.clientPublicKeyPath,
    });
  }

  async _request(path, message) {
    try {
      const msg = this.rsa.encryptAndSign(message);
      const res = await axios.post(`${this.url}${path}`, msg, {
        headers: { 'content-type': 'text/plain' },
      });
      const resData = this.rsa.decryptAndVerify(res.data);
      if (resData.verified) {
        return resData.message;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async requestIdentity(id) {
    const res = await this._request('/identity', JSON.stringify({ id }));
    return res;
  }
}

export default AIPClient;
