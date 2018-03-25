# Store Adapter

Store adapter let you configure which identity store the AIP should access when it request a user identity

## Setup

You can configure which store adapter to use in the [AIP configuration](configuration.md)
The default store adapter is the [JSON]() adapter.

## Build your own

Store Adapters are simple ES6+ that expose defined methods.

**Methods**:

***initialize***<br />
params: `aipInstance` - (instance) _An instance of the AIP_<br />
return: `this` - (instance) _Self Store adapter instance_

***getIdentity***<br />
params: `id` - (string) _Id of a user_<br />
return: `userIdentity` - (object) _An object containing the requested user identity data_

**Example**:
```js
class CustomStoreAdapter {
  constructor(options = {}) {
    this.type = 'custom_name_here';
    this.aip = null;
    this.options = options;

    this.getIdentity = this.getIdentity.bind(this);
  }

  async initialize(aipInstance) {
    this.aip = aipInstance;

    // initialize here your store connection
    // (e.g. connect to mongodb/ldap/localdb...)

    return this;
  }

  async getIdentity(id) {

    // Fetch Identity from the custom identity store

    return identity;
  }
}

export default CustomStoreAdapter;
```

## Existing adapters

- JSON: [github](link) - [npm](link)
- LDAP: [github](link) - [npm](link)
