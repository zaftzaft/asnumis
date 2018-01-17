'use strict';

const fs = require("fs");
const readline = require("readline");

let asnum = {};

const rl = readline.createInterface({
  input: fs.createReadStream("autnums.html")
});

rl.on("line", line => {
  if(!/AS\d+/.test(line)) {
    return;
  }

  const data = line.match(/(AS\d+)\s*<\/a>\s*(.+)/);
  const asn = parseInt(data[1].match(/\d+/)[0], 10);
  asnum[asn] = data[2];
});


rl.on("close", () => {
  console.log(JSON.stringify(asnum));
});
