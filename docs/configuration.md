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
?> To be defined with UoN
