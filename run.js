const assert = require('assert');

const bcrypt = require("./pkg/bcrypt_fast");

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

const verifyA = bcrypt.verify(
    password,
    hashA,
);

const verifyB = bcrypt.verify(
    password,
    hashB,
);

assert(
    verifyA && verifyB
);

console.log(
    process.hrtime(start)[1] / 1E6
);
