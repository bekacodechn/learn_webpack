import numRef from "./ref.json";
import reduce from "lodash2/reduce";

export function wordToNum2(word) {
  return reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}
