const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function getComponent() {
  await sleep(5000);
  return import("lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");

      element.innerHTML = _.join(["Hello", "webpack"], " ");

      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
