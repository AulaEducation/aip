// eslint-disable-next-line
export const expressLogRoutes = (app, port, mountPath) => {
  console.log(`--------------------------
Express app:

Port: ${port}
Routes:

  GET: /health
  POST: /identity
  POST: /update

--------------------------
`);
};
