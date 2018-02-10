#!/usr/bin/env node
'use strict';

const asn = require("./asn.json");

console.log(asn[process.argv[2]]);
