#!/usr/bin/env node
'use strict';

const asn = require("./asn.json");

const asnumis = n => {
  return asn[n];
};

module.exports = asnumis;

if(typeof require != "undefined" && require.main === module) {
  let num = process.argv[2];
  if(!num) {
    console.error("usage: asnumis <as number>");
    return process.exit(2);
  }

  let org = asnumis(num);
  if(org) {
    console.log(org);
    process.exit(0);
  }
  else {
    process.exit(1);
  }
}

