require('babel-polyfill');
const AIPClient = require('./dist/index').default;

const start = async () => {
  const client = new AIPClient({
    url: 'http://localhost:4242',
    privateKeyPath: '../test_keys/client_private_key.test.pem',
    clientPublicKeyPath: '../test_keys/server_public_key.test.pem',
  });


  await client._request('/update', JSON.stringify({ dummy: 'txt' }));
};

start();
