import * as ts from "typescript";

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
  const jsCode = transpileTypescript(tsCode);

  // add compiled JS to document
  const newScriptElement = document.createElement("script");
  newScriptElement.textContent = jsCode;
  document.head.appendChild(newScriptElement);
};

const transpileTypescript = (tsCode: string): string => {
  const compilerOptions: ts.TranspileOptions = {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
    },
  };
  const jsCode = ts.transpileModule(tsCode, compilerOptions);
  return jsCode.outputText;
};

const fullyCompileTypescript = (tsCode: string) => {
  const sourceFile = ts.createSourceFile("", tsCode, ts.ScriptTarget.ESNext);

  const compilerOptions: ts.CompilerOptions = {
    module: ts.ModuleKind.CommonJS,
  };
  const programOptions: ts.CreateProgramOptions = {
    options: compilerOptions,
    rootNames: [],
  };

  const host = ts.createCompilerHost(compilerOptions);
  const program = ts.createProgram([], compilerOptions, host);
  program.emit();
};

window.onload = () => {
  doEverything();
};
