import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressLogRoutes } from '../utils/express';
import healthRouter from './routers/health';
import identityRouter from './routers/identity';
import updatesRouter from './routers/update';

import {
  notFoundHandler,
  errorHandler,
  decryptAndVerifyMiddleWare,
  sendAndEncryptMiddleware,
} from './middlewares';

const SERVICE_BASE_PATH = '/';
const PORT = 4242;

class API {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.text());
    this.aip = null;
  }

  decryptAndVerify(msg) {
    return this.aip.rsa.decryptAndVerify(msg);
  }

  encryptAndSign(msg) {
    return this.aip.rsa.encryptAndSign(msg);
  }

  bindRoutes() {
    this.app.use(SERVICE_BASE_PATH, healthRouter);

    this.app.use(
      `${SERVICE_BASE_PATH}identity`,
      decryptAndVerifyMiddleWare(this.decryptAndVerify),
      identityRouter(this.aip),
      sendAndEncryptMiddleware(this.encryptAndSign),
    );

    this.app.use(
      `${SERVICE_BASE_PATH}update`,
      decryptAndVerifyMiddleWare(this.decryptAndVerify),
      updatesRouter(this.aip),
    );

    this.app.use(errorHandler);
    this.app.use(notFoundHandler);
  }

  start(aipInstance) {
    this.aip = aipInstance;
    return new Promise((resolve) => {
      this.bindRoutes();
      this.app.listen(PORT, () => {
        expressLogRoutes(this.app, PORT, SERVICE_BASE_PATH);
        resolve();
      });
    });
  }
}

export default API;
