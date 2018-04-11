#!/usr/bin/env node
'use strict';

const fs       = require("fs");
const path     = require("path");
const readline = require("readline");
const got      = require("got");
const asn      = require("./asn.json");

const asnumis = n => {
  return asn[n];
};

asnumis.update = () => {
  return new Promise((resolv, reject) => {
    let asnum = {};

    const rl = readline.createInterface({
      input: got.stream("http://www.cidr-report.org/as2.0/autnums.html")
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
      fs.writeFile(path.join(__dirname, "asn.json"), JSON.stringify(asnum), (err) => {
        if(err) {
          return reject(err);
        }
        resolv(true);
      });
    });

  });
};

module.exports = asnumis;

if(typeof require != "undefined" && require.main === module) {
  let num = process.argv[2];
  if(!num) {
    console.error("usage: asnumis <as number> [--update]");
    return process.exit(2);
  }

  if(num === "-u" || num === "--update") {
    asnumis.update().then(() => {
      console.log("updated");
      process.exit(0);
    })
    .catch(e => {
      console.error(e.stack);
      process.exit(1);
    });
  }
  else {
    let org = asnumis(num);
    if(org) {
      console.log(org);
      process.exit(0);
    }
    else {
      process.exit(1);
    }
  }

}

