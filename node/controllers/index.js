//filename: controller.js
let bodyparser = require('body-parser');
let db = require('../db/index.js');

let loggingController = {
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
  }
}

module.exports = loggingController;
