#![no_std]
#![feature(core_intrinsics, lang_items)]

extern crate alloc;
extern crate wee_alloc;

use alloc::vec::Vec;

use bcrypt;

use wasm_bindgen;
use wasm_bindgen::prelude::*;
use core::iter::repeat;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn hash(
    input: &str,
    cost: u32,
) -> alloc::string::String {
    match bcrypt::hash(input, cost) {
        Ok(res) => res,
        Err(msg) => {
            log(&alloc::format!("{:?}", msg));
            panic!();
        }
    }
}

#[wasm_bindgen]
pub fn verify(
    input: &str,
    hash: &str,
) -> bool {
    bcrypt::verify(input, hash).unwrap()
}
