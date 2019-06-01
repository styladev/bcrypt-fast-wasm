
const path = require('path').join(__dirname, 'bcrypt_fast_bg.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
imports['./bcrypt_fast'] = require('./bcrypt_fast');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
