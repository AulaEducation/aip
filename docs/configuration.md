# AIP Configuration

## Library
The library can be initialized with a standard js object containing the following:
```js
{
  storeAdapter: // (store adapter instance),
  logAdapter: // (log adapter instance),
  filterAdapter: // (filter adapter instance),
  privateKeyPath: // (string) private server key,
  clientPublicKeyPath: // (string) public client key,
}
```

example:
```js
{
  storeAdapter: new AIPJSONStoreAdapter({ dbPath: './users_db.json' }),
  logAdapter: new AIPDiskLogAdapter({ withTimestamp: true, useConsole: true }),
  logAdapter: new AIPBaseFilterAdapter(),
  privateKeyPath: './test_keys/server_private_key.test.pem',
  clientPublicKeyPath: './test_keys/client_public_key.test.pem',
}
```


## Docker
Docker containers can be configured through environment variables.

- **AIP_STORE_ADAPTER** - _name or path of a store adapter_
- **AIP_STORE_ADAPTER_CONFIG** - _stringified config for the store adapter_
- **AIP_LOG_ADAPTER** - _name or path of a log adapter_
- **AIP_LOG_ADAPTER_CONFIG** - _stringified config for the log adapter_
- **AIP_FILTER_ADAPTER** - _name or path of a filter adapter_
- **AIP_FILTER_ADAPTER_CONFIG** - _stringified config for the filter adapter_
- **AIP_SERVER_PRIVATE_KEY_PATH** - _path of the private key_
- **AIP_CLIENT_PUBLIC_KEY_PATH** - _path of the client public key_


example:
```shell
AIP_STORE_ADAPTER='aip-json-store-adapter'
AIP_STORE_ADAPTER_CONFIG='{ "dbPath": "./users_db.json" }'
AIP_LOG_ADAPTER='aip-disk-log-adapter'
AIP_LOG_ADAPTER_CONFIG='{ "withTimestamp": true, "useConsole": true }'
AIP_FILTER_ADAPTER='./adapters/filter/baseFilterAdapter'
AIP_FILTER_ADAPTER_CONFIG='{}'
AIP_SERVER_PRIVATE_KEY_PATH='/path/of/the/private/key.pem'
AIP_CLIENT_PUBLIC_KEY_PATH='/path/of/the/client/public/key.pem'
```
