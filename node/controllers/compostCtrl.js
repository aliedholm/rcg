//filename: logController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

//control for logging data
let controller = {
  logRestaurant: async function(req, res) {
    const database = restaurant;
    const restaurant = req.query.restaurant;
    console.log(restaurant);
    const datetime = req.query.datetime;
    const bucketType = req.query.bucketType;
    const contamination = req.query.contamination;
    const tareWeight = req.query.tareWeight;
    const totalWeight = req.query.totalWeight;
    const bucketWeight = req.query.bucketWeight;
    const notes = req.query.notes;
    const query = [
      "CREATE TABLE IF NOT EXISTS " + restaurant + " (id INT AUTO_INCREMENT NOT NULL, buckettype VARCHAR(10) NOT NULL, datetime DATETIME NOT NULL, contamination INT NOT NULL, tareweight FLOAT NOT NULL, totalweight FLOAT NOT NULL, notes VARCHAR(100), bucketweight FLOAT NOT NULL, PRIMARY KEY(ID)) ENGINE=INNODB;", 
      "INSERT INTO " + restaurant + " (buckettype, datetime, contamination, tareweight, totalweight, notes, bucketWeight) VALUES('" + bucketType + "', '" + datetime + "', '" + contamination + "', '" + tareWeight + "', '"+ totalWeight + "', '"+ notes + "', '"+ bucketWeight + "');"
    ];
    const view = 'dashboard';  
    
    const results = await connectDb(query, database);
      res.render(view, {
        data: results,
      });
  },
  
  logCompost: async function(req, res) {
    const view = 'dashboard';  
    
      res.render(view, {
        message: "some message here;" 
      });
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
    res.render(view, {
      data: results,
      database: database,
      table: table,
      datetime: datetime,
      type: type,
      message: message
    });
  },
}

function runQuery(query, database){
  return new Promise(function(resolve, reject){
    connectDb(query, database);
  });
}

module.exports = controller;
