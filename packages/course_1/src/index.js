import _ from "lodash";
import "./style.css";
import Icon from "./icon.svg";
import Data from "./data.xml";
import Notes from "./data.csv";
import dataJson from "./data.json";
import { name } from "./data.json";
import toml from "./data.toml";
import yaml from "./data.yaml";
import json from "./data.json5";

console.log("toml", toml.title); // output `TOML Example`
console.log("toml", toml.owner.name); // output `Tom Preston-Werner`

console.log("yaml", yaml.title); // output `YAML Example`
console.log("yaml", yaml.owner.name); // output `Tom Preston-Werner`

console.log("json5", json.title); // output `JSON5 Example`
console.log("json5", json.owner.name); // output `Tom Preston-Werner`

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
