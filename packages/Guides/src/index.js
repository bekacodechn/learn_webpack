import _ from "lodash";
import findLowestCommonAncestor from "find-lowest-common-ancestor";
import Print from "./print";

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack5"], " ");

  element.onclick = Print.bind(null, "Hello webpack!");

  console.log("findLowestCommonAncestor", findLowestCommonAncestor);

  return element;
}

document.body.appendChild(component());
