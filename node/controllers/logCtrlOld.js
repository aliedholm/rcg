//filename: logController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

//control for logging data
let controller = {
  logData: function(req, res) {
    database = req.params.database;
    table = req.params.table;
    datetime = req.query.datetime;
    reading = req.query.reading;
    console.log(table + " - " + datetime + " - " + reading);
    query = [
      "CREATE TABLE IF NOT EXISTS " + table + " (id INT AUTO_INCREMENT NOT NULL, reading VARCHAR(10) NOT NULL, datetime DATETIME NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;", 
      "INSERT INTO " + table + " (datetime, reading) VALUES('" + datetime + "', " + reading + ");"
    ];
    connectDb(query, database);
  },
  
  logMessage: function(req, res) {
    database = req.params.database;
    table = req.params.table;
    datetime = req.query.datetime;
    type = req.query.type;
    message = req.query.message;
    console.log(table + " - " + datetime + " - " + type + " - " + message);
    query = [
      'CREATE TABLE IF NOT EXISTS ' + table + ' (id INT AUTO_INCREMENT NOT NULL, datetime DATETIME NOT NULL, type VARCHAR(10) NOT NULL, message VARCHAR(30) NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;', 
      'INSERT INTO ' + table + ' (datetime, type, message) VALUES("' + datetime + '", "' + type + '"    , "' + message + '")'
    ];
    connectDb(query, database);
  },
}

module.exports = controller;
