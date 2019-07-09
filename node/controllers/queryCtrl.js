//filename: logController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

let controller = {
  retrieveTables: function(req, res){
    database = req.params.database;
    query = ["SHOW TABLES FROM " +database +";"];
    connectDb(query, database, function(results){
      res.render('dashboard', {data: results});
      console.log('results from controller' + results);
    });
  },

  retrieveTable: function(req, res){
    database = req.params.database;
    table = req.params.table;
    query = ["SELECT * FROM " +table +";"];
    connectDb(query, database);
  },

  retrieveTableDates: function(req, res) {
    database = req.params.database;
    table = req.params.table;
    start = req.query.start;
    end = req.query.end;
    query = ["SELECT * FROM " +table +" WHERE datetime BETWEEN '" +start + "' AND '" +end +"';"];
    connectDb(query, database);
  },

  retrieveTableIds: function(req, res) {
    database = req.params.database;
    table = req.params.table;
    start = req.query.start;
    end = req.query.end;
    query = ["SELECT * FROM " +table +" WHERE id BETWEEN " +start +" AND " +end +";"];
    connectDb(query, database);
  }
}

module.exports = controller;
