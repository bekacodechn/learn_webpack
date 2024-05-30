import reduce from "lodash/reduce";

export function wordToNum(word) {
  return reduce(
    numRef,
    (accum, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : accum;
    },
    -1
  );
}
