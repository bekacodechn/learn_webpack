import _ from "lodash";
import "./style.css";
import Icon from "./icon.svg";
import Data from "./data.xml";
import Notes from "./data.csv";
import dataJson from "./data.json";
import { name } from "./data.json";

console.log("Icon", Icon);

function component() {
  const element = document.createElement("div");

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  console.log("xml data", Data);
  console.log("csv data", Notes);
  console.log("json data", dataJson);
  console.log("json name", name);

  return element;
}

document.body.appendChild(component());
