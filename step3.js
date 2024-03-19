"use strict";

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
  return contents;
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
  return response.text();
}

/**if the input is url, reads url's contents. If not it reads file contents.
 * If there is an error, shows the error. */
async function ultimateCat(path) {
  if (URL.canParse(path)) {
    return await webCat(path);
  } else {
    return await cat(path);
  }
}

/** if --out follows script name, it takes next argument and
 * writes to that path. */

async function catWrite(path) {
  if (path === "--out") {
    const content = await ultimateCat(process.argv[4])
    await fsP.writeFile(process.argv[3], content, "utf8")

  } else {
    ultimateCat(path);
  }
}

catWrite(process.argv[2])

