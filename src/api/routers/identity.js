import { Router } from 'express';

const get = (aip) => {
  const router = Router();

  router.post('/', async (req, res, next) => {
    aip.log.log('Requesting identity for', req.body.id);
    const user = await aip.store.getIdentity(req.body.id);

    if (!user) {
      aip.log.error('Fetch Identity for', req.body.id, 'not found');
    } else {
      aip.log.log('Fetch Identity for', req.body.id, 'success');
    }

    res.body = aip.filter.filter(user);
    next();
  });

  return router;
};

export default get;
