import { Router } from 'express';
import childProcess from 'child_process';

export const forceUpdate = () => {
  childProcess.exec('kill -2 1');
};

const get = (aip) => {
  const router = Router();

  router.post('/', () => {
    aip.log.log('Requesting AIP code update');
    forceUpdate();
  });

  return router;
};

export default get;
