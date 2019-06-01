
const path = require('path').join(__dirname, 'bcrypt_wasm_bg.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
imports['./bcrypt_wasm'] = require('./bcrypt_wasm');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
