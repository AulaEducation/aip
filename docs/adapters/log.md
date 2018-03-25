# Log Adapter

Log adapter let you configure which log store the AIP should send his log to and allow formatting of them.

## Setup

You can configure which log adapter to use in the [AIP configuration](configuration.md)
The default log adapter is the [Disk]() adapter.

## Build your own

Log Adapters are simple ES6+ that expose defined methods.

**Methods**:

***initialize***<br />
params: `aipInstance` - (instance) _An instance of the AIP_<br />
return: `this` - (instance) _Self Log adapter instance_

***log***<br />
params: `data` - (any) _Data to log_<br />
return: `undefined`

***info***<br />
params: `data` - (any) _Data to log_<br />
return: `undefined`

***error***<br />
params: `data` - (any) _Data to log_<br />
return: `undefined`

**Example**:
```js
class CustomLogAdapter {
  constructor(options = {}) {
    this.options = options;
    this.aip = null;
  }

  async initialize(aipInstance) {
    this.aip = aipInstance;

    // initialize here your log store connection
    // (e.g. connect to logstash / create disk files...)

    return this;
  }

  log(...data) {
    // work with log logs data
  }

  info(...data) {
    // work with info logs data
  }

  error(...data) {
    // work with error logs data
  }
}

export default CustomLogAdapter;

```

## Existing adapters

- Disk: [github](link) - [npm](link)
