// CLASS: Main
//
// Author: Ying Liang
//
// REMARKS: This is our main class, where we will call a method to encode our textfile using the Huffman algorithm.
//
//-----------------------------------------
"use strict"

let HuffmanEncoder = require('./HuffmanEncoder.js');

main();

function main() {

    let fileName = "hamlet.txt"

    let newHuffEncoder = new HuffmanEncoder(fileName);

    newHuffEncoder.encode();

}