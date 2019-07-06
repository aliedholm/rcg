var mysql = require('mysql');

const dbUtilities = require('../db/db.js');

retrieveTables = function(req, res){
  database = req.params.database;
  query = "SHOW TABLES FROM " + database + ";";
  let results = connectDb(req, res, query);
  console.log("results from controller   " + results);
//  res.render('dashboard', {data: results});
};

retrieveTable = function(req, res,){
  database = req.params.database;
  table = req.params.table;
  query = "SELECT * FROM " + table + ";";
  connectDb(req, res, query, database, table);
};

retrieveTableDates = function(req, res){
  database = req.params.database;
  table = req.params.table;
  start = req.query.start;
  end = req.query.end;
  query = "SELECT * FROM " + table + " WHERE datetime BETWEEN '" + start + "' AND '" + end + "';", 
  connectDb(req, res, query, database, table, start, end);
};

retrieveTableIds = function(req, res){
  database = req.params.database;
  table = req.params.table;
  start = req.query.start;
  end = req.query.end;
  query = "SELECT * FROM " + table + " WHERE id BETWEEN " + start + " AND " + end + ";", 
  connectDb(req, res, query, database, table, start, end);
};

module.exports = retrieveTables, retrieveTable, retrieveTableDates, retrieveTableIds;
