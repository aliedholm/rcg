//filename: controller.js
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
    queryTable = 'CREATE TABLE IF NOT EXISTS ' + table + ' (id INT AUTO_INCREMENT NOT NULL, reading VARCHAR(10) NOT NULL, datetime DATETIME NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;';
    query = 'INSERT INTO ' + table + ' (datetime, reading) VALUES("' + datetime + '", "' + reading + '");';
    connectDb(req, res, queryTable, database);
    connectDb(req, res, query, database);
  },
  
  logMessage: function(req, res) {
    database = req.params.database;
    table = req.params.table;
    datetime = req.query.datetime;
    type = req.query.type;
    message = req.query.message;
    console.log(table + " - " + datetime + " - " + type + " - " + message);
    queryTable = 'CREATE TABLE IF NOT EXISTS ' + table + ' (id INT AUTO_INCREMENT NOT NULL, datetime DATETIME NOT NULL, type VARCHAR(10) NOT NULL, message VARCHAR(30) NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;';
    query = 'INSERT INTO ' + table + ' (datetime, type, message) VALUES("' + datetime + '", "' + type + '"    , "' + message + '")';
    connectDb(req, res, queryTable, database);
    connectDb(req, res, query, database);
  },

//control for retrieval of data
  retrieveTables: function(req, res){
    database = req.params.database;
    query = "SHOW TABLES FROM " +database +";";
    connectDb(req, res, query, database);
  },

  retrieveTable: function(req, res){
    database = req.params.database;
    table = req.params.table;
    query = "SELECT * FROM " +table +";";
    connectDb(req, res, query, database);
  },

  retrieveTableDates: function(req, res) {
    database = req.params.database;
    table = req.params.table;
    start = req.query.start;
    end = req.query.end;
    query = "SELECT * FROM " +table +" WHERE datetime BETWEEN '" +start + "' AND '" +end +"';";
    connectDb(req, res, query, database);
  },

  retrieveTableIds: function(req, res) {
    database = req.params.database;
    table = req.params.table;
    start = req.query.start;
    end = req.query.end;
    query = "SELECT * FROM " +table +" WHERE id BETWEEN " +start +" AND " +end +";";
    connectDb(req, res, query, database);
  }
}

module.exports = controller;
