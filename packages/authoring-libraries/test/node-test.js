const numbers = require("../dist/webpack-numbers");
const { wordToNum, wordToNum2 } = require("../dist/webpack-numbers");

const r = numbers.numToWord(1);
console.log("r :>> ", r);

const r2 = wordToNum("Two");
console.log("r2 :>> ", r2);

const r3 = wordToNum2("Three");
console.log("r3 :>> ", r3);
