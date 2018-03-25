import 'babel-polyfill';
import AulaIdentityProvider from './aip';
import getAIPConfig from './config';
import bindExitSignals from './exit';

bindExitSignals();

const start = async () => {
  const config = getAIPConfig({
    logAdapterConfig: { withTimestamp: true, useConsole: true },
    filterAdapterConfig: {
      customFilter: u => u,
    },
  });

  const aip = new AulaIdentityProvider(config);

  await aip.start();
};

start();
