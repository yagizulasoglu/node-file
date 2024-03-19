"use strict";

const fsP = require("fs/promises");

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

cat(process.argv[2]);
