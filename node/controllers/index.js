//filename: controller.js
let bodyparser = require('body-parser');
const logsDb = require('../db/logs.js');
const queryDb = require('../db/queries.js');
const dbUtilities = require('../db/db.js');

//control for logging data
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

//control for retrieval of data
  retrieveTables: function(req, res) {
    retrieveTables(req, res);
  },

  retrieveTable: function(req, res) {
    retrieveTable(req, res);
  },

  retrieveTableDates: function(req, res) {
    retrieveTableDates(req, res);
  },

  retrieveTableIds: function(req, res) {
    retrieveTableIds(req, res);
  }
}

module.exports = controller;
