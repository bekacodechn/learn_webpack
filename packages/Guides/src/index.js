import _ from "lodash";
import find1 from "find-lowest-common-ancestor";

function component() {
  const element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  console.log("find1", find1);

  return element;
}

document.body.appendChild(component());
