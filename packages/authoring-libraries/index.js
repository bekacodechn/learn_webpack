import _ from "lodash2";
import numRef from "./ref.json";
export { wordToNum2 } from "./num.js";

export function numToWord(num) {
  console.log("this :>> ", this);
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.num === num ? ref.word : accum;
    },
    ""
  );
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}
