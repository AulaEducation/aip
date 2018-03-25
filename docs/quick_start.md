# Quick Start

The AIP can be used both as a library and as a standalone service when used in conjunction with docker.

## As library

### Install:
npm:
```bash
npm install --save @aula/aip
```

yarn:
```bash
yarn add @aula/aip
```

### Usage

```js
import AulaIdentityProvider from '@aula/aip';

// ...

const aip = new AulaIdentityProvider(config);

await aip.start();
```

Configuration can be found [here](configuration.md)

## As a service

Refer to the [Deployment section](deployment.md)
