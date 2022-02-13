import FindRegex from "./FindRegex.js";

const findRegexEmitter = new FindRegex(/".*":/g);

findRegexEmitter
  .addFile('testA.json')
  .addFile('testB.json')
  .find()
  .on("error", (err) => console.error("Error found: ", err))
  .on("fileread", (file) => console.log(`Read file: ${file}`))
  .on("match", (file, match) => console.log(`Match ${match} found on file ${file}`))
  .on("start", (files) => console.log(`Started reading files: ${files.join(", ")}`))