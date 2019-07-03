//filename: controller.js
let bodyparser = require('body-parser');
let logs = require('../db/logs.js');
let queries = require('../db/queries.js');

let controller = {
  logData: function(req, res) {
    let datetime = req.query.datetime;
    let reading = req.query.reading;
    let table = req.query.table;
    console.log(table + " - " + datetime + " - " + reading);
    res.send("logged: " + table + " - " + datetime + " - " + reading + " successfully");
    postReading(req, res, datetime, reading, table);
  },
  
  logMessage: function(req, res) {
    let datetime = req.query.datetime;
    let type = req.query.type;
    let message = req.query.message;
    let table = req.query.table;
    console.log(table + " - " + datetime + " - " + type + " - " + message);
    res.send("logged: " + table + " - " + datetime + " - " + type + " - " + " successfully");
    postLog(req, res, datetime, type, message, table);
  },

  listTables: function(req, res) {
    let database = req.query.database;
    retrieveTables(req, res, database);
  },

  retrieveTable: function(req, res) {
    let database = req.query.database;
    let table = req.query.table;
    retrieveTable(req, res, database, table);
  }
}

module.exports = controller;
