# Deployment

## Docker

The latest docker image of the AIP can be found here: [docker hub](https://hub.docker.com/r/aulaeducation/aip/)

### docker-compose

example:
```yml
version: '3'
services:
  aip:
    image: aulaeducation/aip:latest
    ports:
      - "4242:4242"
    volumes:
      - ./test_keys:/keys
    environment:
      - AIP_SERVER_PRIVATE_KEY_PATH=/keys/server_private_key.test.pem
      - AIP_CLIENT_PUBLIC_KEY_PATH=/keys/client_public_key.test.pem
      - AIP_STORE_ADAPTER_CONFIG={"url":"ldap://someurlhere","dn":"cn=admin,dc=aula,dc=education","secret":"somepassword","filter":"(&(email={{{ id }}}))","scope":"sub","searchBase":"dc=aula,dc=education"}
      - AIP_STORE_ADAPTER=aip-ldap-store-adapter
```

### Configuration

Configuration can be done through environment variables.
The list of options can be found in the [configuration section](./configuration)
