//filename: apiLogController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

//control for logging data
let controller = {
  logData: async function(req, res) {
    const database = req.params.database;
    const table = req.params.table;
    const datetime = req.query.datetime;
    const reading = req.query.reading;
    const query = [
      "CREATE TABLE IF NOT EXISTS " + table + " (id INT AUTO_INCREMENT NOT NULL, reading VARCHAR(10) NOT NULL, datetime DATETIME NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;", 
      "INSERT INTO " + table + " (datetime, reading) VALUES('" + datetime + "', " + reading + ");"
    ];
    const view = 'dashboard';  
    
    const results = await connectDb(query, database);
    res.send(results);
  },
  
  logMessage: async function(req, res) {
    const database = req.params.database;
    const table = req.params.table;
    const datetime = req.query.datetime;
    const type = req.query.type;
    const message = req.query.message;
    const query = [
      'CREATE TABLE IF NOT EXISTS ' + table + ' (id INT AUTO_INCREMENT NOT NULL, datetime DATETIME NOT NULL, type VARCHAR(10) NOT NULL, message VARCHAR(30) NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;', 
      'INSERT INTO ' + table + ' (datetime, type, message) VALUES("' + datetime + '", "' + type + '"    , "' + message + '")'
    ];
    const view = 'dashboard';  
    
    const results = await connectDb(query, database);
    res.send(results);
  }
}

function runQuery(query, database){
  return new Promise(function(resolve, reject){
    connectDb(query, database);
  });
}

module.exports = controller;
