var wasm;

const TextDecoder = require('util').TextDecoder;

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

module.exports.__wbg_log_ba0ef557d7bcf361 = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    console.log(varg0);
};

let WASM_VECTOR_LEN = 0;

let cachegetNodeBufferMemory = null;
function getNodeBufferMemory() {
    if (cachegetNodeBufferMemory === null || cachegetNodeBufferMemory.buffer !== wasm.memory.buffer) {
        cachegetNodeBufferMemory = Buffer.from(wasm.memory.buffer);
    }
    return cachegetNodeBufferMemory;
}

function passStringToWasm(arg) {

    const size = Buffer.byteLength(arg);
    const ptr = wasm.__wbindgen_malloc(size);
    getNodeBufferMemory().write(arg, ptr, size);
    WASM_VECTOR_LEN = size;
    return ptr;
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {string} input
* @param {number} cost
* @returns {string}
*/
module.exports.hash = function(input, cost) {
    const ptr0 = passStringToWasm(input);
    const len0 = WASM_VECTOR_LEN;
    const retptr = globalArgumentPtr();
    try {
        wasm.hash(retptr, ptr0, len0, cost);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);

    }

};

/**
* @param {string} input
* @param {string} hash
* @returns {boolean}
*/
module.exports.verify = function(input, hash) {
    const ptr0 = passStringToWasm(input);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm(hash);
    const len1 = WASM_VECTOR_LEN;
    try {
        return (wasm.verify(ptr0, len0, ptr1, len1)) !== 0;

    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
        wasm.__wbindgen_free(ptr1, len1 * 1);

    }

};

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

module.exports.__wbg_new_3a746f2619705add = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
};

function getObject(idx) { return heap[idx]; }

module.exports.__wbg_call_f54d3a6dadb199ca = function(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
};

module.exports.__wbg_self_ac379e780a0d8b94 = function(arg0) {
    return addHeapObject(getObject(arg0).self);
};

module.exports.__wbg_crypto_1e4302b85d4f64a2 = function(arg0) {
    return addHeapObject(getObject(arg0).crypto);
};

module.exports.__wbg_getRandomValues_1b4ba144162a5c9e = function(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
};

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

module.exports.__wbg_getRandomValues_1ef11e888e5228e9 = function(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
};

module.exports.__wbg_require_6461b1e9a0d7c34a = function(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
};

module.exports.__wbg_randomFillSync_1b52c8482374c55b = function(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
};

module.exports.__wbindgen_is_undefined = function(i) { return getObject(i) === undefined ? 1 : 0; };

module.exports.__wbindgen_jsval_eq = function(a, b) { return getObject(a) === getObject(b) ? 1 : 0; };

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

module.exports.__wbindgen_object_drop_ref = function(i) { dropObject(i); };

wasm = require('./bcrypt_fast_bg');

