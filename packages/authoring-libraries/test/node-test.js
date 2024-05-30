const numbers = require("../dist/webpack-numbers");
const { wordToNum } = require("../dist/webpack-numbers");

const r = numbers.numToWord(1);
console.log("r :>> ", r);

const r2 = wordToNum("Two");
console.log("r2 :>> ", r2);
