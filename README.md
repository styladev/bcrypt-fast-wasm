# bcrypt-wasm

WebAssembly version of bcrypt for Node environments

### Build

```sh
$ make
```

### Usage

```sh
$ yarn add bcrypt-wasm
```

```javascript
const bcrypt = require("bcrypt-wasm");

const start = process.hrtime();

const password = "test";

const hashA = bcrypt.hash(
    password,
    4,
);

const hashB = bcrypt.hash(
    password,
    4,
);

assert(hashA !== hashB);

assert(bcrypt.verify(
    password,
    hashA,
));

assert(bcrypt.verify(
    password,
    hashB,
));
```
