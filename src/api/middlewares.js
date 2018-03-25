// Errors
export const errorHandler = (error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
};

// 404
export const notFoundHandler = (req, res) => res.sendStatus(404);

export const decryptAndVerifyMiddleWare = decryptAndVerify => (req, res, next) => {
  if (req.body) {
    const body = decryptAndVerify(req.body);
    if (body && body.verified) {
      const jsonBody = JSON.parse(body.message);
      req.rawBody = req.body;
      req.body = jsonBody;
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(422);
  }
};

export const sendAndEncryptMiddleware = encryptAndSign => (req, res) => {
  let msgToSend = JSON.stringify(null);
  if (res.body) {
    msgToSend = JSON.stringify(res.body);
  }

  res.send(encryptAndSign(msgToSend));
};
