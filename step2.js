"use strict";
//TODO: Docstrings!!
const fsP = require("fs/promises");

/**Reads file contents. If there is an error, shows the error. */
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("file contents:", contents);
}

/**Reads url's contents. If there is an error, shows the error. */
async function webCat(url) {
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(response);
}

/**if the input is url, reads url's contents. If not it reads file contents.
 * If there is an error, shows the error. */
async function ultimateCat(path) {
  if (URL.canParse(path)) {
    await webCat(path);
  } else {
    await cat(path);
  }
}

ultimateCat(process.argv[2]);
