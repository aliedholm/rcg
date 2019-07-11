//filename: queryController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

let controller = {
  retrieveTables: async function(req, res){
    const database = req.params.database;
    const query = ["SHOW TABLES FROM " +database +";"];
    const view = 'dashboard'

    const results = await connectDb(query, database);
      res.render(view, {
        data: results,
        database: database
      });
  },

  retrieveTable: async function(req, res){
    const database = req.params.database;
    const table = req.params.table;
    const query = ["SELECT * FROM " +table +";"];
    const view = 'sensorTable'
    
    const results = await connectDb(query, database);
      res.render(view, {
        data: results,
        database: database,
        table: table
      });
  },

  retrieveTableDates: async function(req, res) {
    const database = req.params.database;
    const table = req.params.table;
    const start = req.query.start;
    const end = req.query.end;
    const query = ["SELECT * FROM " +table +" WHERE datetime BETWEEN '" +start + "' AND '" +end +"';"];
    const view = 'dashboard'
    
    const results = await connectDb(query, database);
      res.render(view, {
        data: results,
        database: database,
        table: table,
        start: start,
        end: end
      });
  },

  retrieveTableIds: async function(req, res) {
    const database = req.params.database;
    const table = req.params.table;
    const start = req.query.start;
    const end = req.query.end;
    const query = ["SELECT * FROM " +table +" WHERE id BETWEEN " +start +" AND " +end +";"];
    const view = 'dashboard'
    
    const results = await connectDb(query, database);
      res.render(view, {
        data: results,
        database: database,
        table: table,
        start: start,
        end: end
      });
  },
}

module.exports = controller;
