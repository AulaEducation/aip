export const getEnvConfig = () => ({
  storeAdapterName: process.env.AIP_STORE_ADAPTER || 'aip-json-store-adapter',
  storeAdapterConfig: JSON.parse(process.env.AIP_STORE_ADAPTER_CONFIG || '{}'),
  logAdapterName: process.env.AIP_LOG_ADAPTER || 'aip-disk-log-adapter',
  logAdapterConfig: JSON.parse(process.env.AIP_LOG_ADAPTER_CONFIG || '{}'),
  filterAdapterName: process.env.AIP_FILTER_ADAPTER || './adapters/filter/baseFilterAdapter',
  filterAdapterConfig: JSON.parse(process.env.AIP_FILTER_ADAPTER_CONFIG || '{}'),
  privateKeyPath: process.env.AIP_SERVER_PRIVATE_KEY_PATH || '',
  clientPublicKeyPath: process.env.AIP_CLIENT_PUBLIC_KEY_PATH || '',
});

export const initializeAdapters = (config) => {
  const StoreAdapter = require(config.storeAdapterName).default;
  const LogAdapter = require(config.logAdapterName).default;
  const FilterAdapter = require(config.filterAdapterName).default;

  return {
    ...config,
    storeAdapter: new StoreAdapter(config.storeAdapterConfig),
    logAdapter: new LogAdapter(config.logAdapterConfig),
    filterAdapter: new FilterAdapter(config.filterAdapterConfig),
  };
};

const getConfig = (config = {}) => {
  let conf = getEnvConfig();
  conf = {
    ...conf,
    ...config,
  };
  conf = initializeAdapters(conf);
  return conf;
};

export default getConfig;
