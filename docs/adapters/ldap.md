# LDAP store

The LDAP store adapter is to use an LDAP backend as a store for the AIP

## Install

```shell
yarn add ./adapters/store/ldap
```

## Configuration

```js
{
  url: 'ldap://example.com'// the url of the ldap backend,
  dn: 'cn=admin,dc=example,dc=com', // the dn for the org
  secret: 'somesecret', // secret to connect to the backend
  filter: '(&(email={{{ id }}}))', // search filter to match users. {{{ id }}} will be replaced with the id of requested identity
  scope: 'sub', // scope for the search
  searchBase: 'dc=aula,dc=education', // base for the search
}
```
