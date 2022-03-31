const scriptTagID = "tsCode";

const doEverything = () => {
  // get user's TS code
  const scriptElement = document.getElementById(scriptTagID);
  if (scriptElement === null) {
    console.log("No Typescript script tag found!");
    return;
  }

  if (scriptElement.textContent === null) {
    console.log("Typescript script tag has nothing in it!");
    return;
  }

  const tsCode = scriptElement.textContent;

  // compile TS code
  const jsCode = `
    console.log("hello");
    document.getElementById("testButton").onclick = () => {
      console.log("you clicked me!");
    };
  `;

  // add compiled JS to document
  const newScriptElement = document.createElement("script");
  newScriptElement.textContent = jsCode;
  document.head.appendChild(newScriptElement);
};

window.onload = () => {
  doEverything();
};
