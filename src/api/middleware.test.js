import {
  errorHandler,
  notFoundHandler,
  decryptAndVerifyMiddleWare,
  sendAndEncryptMiddleware,
} from './middlewares';
import AIP from '../aip';
import RSA from '../rsa';

jest.mock('../aip');
AIP.mockImplementation(() => ({
  rsa: new RSA({
    privateKeyPath: './test_keys/server_private_key.test.pem',
    clientPublicKeyPath: './test_keys/client_public_key.test.pem',
  }, { log: (() => {}) }),
  start: jest.fn(),
}));

beforeEach(() => {
  AIP.mockClear();
});

afterAll(() => {
  jest.unmock('../aip');
});

describe('middlewares', () => {
  describe('notFoundHandler', () => {
    it('should throw 404', (done) => {
      const res = {
        sendStatus: (code) => {
          expect(code).toBe(404);
          done();
        },
      };

      notFoundHandler(null, res);
    });
  });

  describe('errorHandler', () => {
    it('should throw 500', (done) => {
      const res = {
        sendStatus: (code) => {
          expect(code).toBe(500);
          done();
        },
      };

      const err = {};

      errorHandler(err, null, res);
    });
  });

  describe('decryptAndVerifyMiddleWare', () => {
    it('should throw 422 (missing body)', (done) => {
      const aip = new AIP();
      aip.start();
      aip.rsa.initialize();

      const req = {};

      const res = {
        sendStatus: (code) => {
          expect(code).toBe(422);
          done();
        },
      };
      //
      // const err = {};

      decryptAndVerifyMiddleWare(msg => aip.rsa.decryptAndVerify(msg))(req, res, () => done(new Error('Should have failed')));
    });

    it('should throw 403 (not RSA encrypted)', (done) => {
      const aip = new AIP();
      aip.start();
      aip.rsa.initialize();

      const req = {
        body: 'hello',
      };

      const res = {
        sendStatus: (code) => {
          expect(code).toBe(403);
          done();
        },
      };
      //
      // const err = {};

      decryptAndVerifyMiddleWare(msg => aip.rsa.decryptAndVerify(msg))(req, res, () => done(new Error('Should have failed')));
    });

    it('should decrypt and verify an encypted message', (done) => {
      const aip = new AIP();
      aip.start();
      aip.rsa.initialize();

      const encryptedMsg = 'd1cEK1/29QNK5+FUsQJrukkK9gmjibzQRqvRbSBzVqpI5KNFUM5Hk8RRzD/h8zMX7oN6N3pnRLuvh1vwKOg0T2cPapcOq1qXy3t4xEDnSr4xFLDjCcPRxSDom6kwsA2M89jrLbPn0PbIRIpbTQlZWBR0xgCSpMlIYb4vjrl4RbpkUEB46vbml2FznsUUYJjnpM+lLRSRdk0vBF5yo8TPsDqULXE8wMG52MT5eJuUYAQslMupwGib3MJgbYUjqGv8FlM9Lz8pdBhdKExtNBeMlFk9stAHoumTSeate/hsbMP8VorMkSGE00/IGDBz+izXlYTOMRYW3ve2kLkYGzl2afP1BMCaDAWiVoLHGYZI7qrAFyVDtr5StXiDEH3dEcQxGuOvvMqA1I0SfGigpE1dyvnHVJ2qdola9Vu6ydAjBJD+qEiN0b+D7R+w8fup5MximFct1y9F/Jiknh3wgubuh9Hclsom4mMmorcdlblJQxRySph59gpD0Zxkd33rUL3vlNAJNEBXVs2VgoyjKIq+kLZ2jcOYUtFIMpr8JA724riVSuKTUGxsB7rN8UrGs3Y1RO4DsodfQ5TnbuiQEVc/hnmVPVrrXIjTnaStPGqjaOTYiMpV+1a6+gGK+9V4J/TdjcQDxyGcT/oeJLROJLklBGApH2hJZr7FMbRnxd9pb8U=kqHJM7a2BK5vlS3yhTVBguJ45a/NkMWuyKuG2CT3tp4x9amF6vjoP8cQ7nEvGQ2IlEHA3Zo02zolP8SGY8HhTp2k4TKhFIo4jsbOb7U8QQIqR76VmsOYAAtR1pqh4fRRN9rV3/pIr8Y2mVEKNerLhYgXKGFesQBkgWE2++FdCJVqqI0wBZTTU58nJaD/r1j6Ogu6yk048arlUQ/SL/Q8J5va3gXeW1cSglofaSUztmPlXEZj/ZJC4ZaQP+J8GAGBdYsgp0TPu1Nn0roVrbuUYuiJeKJzi8dzgnnPZy5ItObygY3vnnMcTsZuL44nje5TxppOw7BDEdZya4vdjtC8jRrX7ylzsAEQ1RTYFPj7Re1CdeJ2whIWjZ+ySVBwtoNs86uxC68x+STp6mgMGxx/F9jLgSiAhZ78a6mxsJNF7kXXF3UazBsoimvoj4xy1pT8Ze2tZqTYKdZPrPJ8n1jVSmBY19EnqNRoT5FocSG9YcOEVPHF3OIV+8ODgASiZq+Oay9t1mtnFSEi82fUn8ZkOVhvTsN3TS1Cqk0WZDxeut3bJW7qAA/YUMKjBiB9aSMEU53cPYY3dcurADoAbs3V/q7odbNqJ/30vOPt/8hJIIiKR+1DZAeEsxZ+VB68OMqUwP23jT6zFQQ364bt/bBvZGpTyPoyCDz01glt1c5MzHE=';

      const req = { body: encryptedMsg };

      const res = {
        sendStatus: (code) => {
          done(new Error(`failed with code ${code}`));
        },
      };

      decryptAndVerifyMiddleWare(msg => aip.rsa.decryptAndVerify(msg))(req, res, () => {
        expect(req).toEqual({
          body: { id: 'claire@aula.education' },
          rawBody: encryptedMsg,
        });
        done();
      });
    });
  });

  describe('sendAndEncryptMiddleware', () => {
    it('should send null', (done) => {
      const res = {
        send: (data) => {
          expect(data).toBe('null');
          done();
        },
      };

      sendAndEncryptMiddleware((msg) => {
        expect(msg).toBe('null'); // stringified
        return msg;
      })({}, res);
    });

    it('should encrypt and sign', (done) => {
      const aip = new AIP();
      aip.start();
      aip.rsa.initialize();

      const res = {
        body: 'hello',
        send: (data) => {
          expect(data).not.toBe('null');
          expect(data.split('=').filter(d => !!d)).toHaveLength(2);
          done();
        },
      };

      sendAndEncryptMiddleware(msg => aip.rsa.encryptAndSign(msg))({}, res);
    });
  });
});
