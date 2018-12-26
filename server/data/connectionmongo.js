'use strict'

const connectionStringWriter = require("../config.js").DB.ConnectionStringWriter;
const connectionStringReader = require("../config.js").DB.ConnectionStringReader;


const promise = require("bluebird");
const mongoskin = require("mongoskin");
Object.keys(mongoskin).map((key) => {
  let value = mongoskin[key];
  if (typeof value === "function") {
    promise.promisifyAll(value);
    promise.promisifyAll(value.prototype);
  }
});
promise.promisifyAll(mongoskin);

exports.baseRead = mongoskin.db(connectionStringReader, { w: 0 });

exports.baseWrite = mongoskin.db(connectionStringWriter, { w: 1 });