//filename: queryController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

returnTables = async function(req, res){
  const database = req.params.database;
  const query = ["SHOW TABLES FROM " +database +";"];
  const results = await connectDb(query, database);
  return results;
}

skimDates = function(array){
  let dates = [];
  for(var i = array.length - 1; i >= 0; i--){
    const dateRaw = JSON.stringify(array[i].datetime);
    let date = dateRaw.substring(1, 11);
    console.log("this is a check **********************: " + date);
    if(dates.indexOf(date) == -1){
      dates.push(date);
    }
  }
  console.log('These are the dates: ' + dates);
  return dates;
}

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
    const view = 'dashboard'
    
    const tables = await returnTables(req, res);
    const results = await connectDb(query, database);
    let resultsTrimmed = [];
    if(results[0].length > 500){
      for(var i = results[0].length; i > 0; i--){
        if(i % 10 == 0){
          resultsTrimmed.push(results[0][i]);
          console.log('RESULTS ----- ' + results[0][i].id);
        }
      }
    } else{
        resultsTrimmed = results[0].reverse();
    }
    const datesAvail = skimDates(resultsTrimmed);
      res.render(view, {
        data: resultsTrimmed,
        database: database,
        table: table,
        tables: tables,
        dates: datesAvail
      });
  },

  retrieveTableDates: async function(req, res) {
    const database = req.params.database;
    const table = req.params.table;
    const start = req.query.start;
    const end = req.query.end;
    const query = ["SELECT * FROM " +table +" WHERE datetime BETWEEN '" +start + "' AND '" +end +"';"];
    const view = 'dashboard'
    
    const tables = await returnTables(req, res);
    const results = await connectDb(query, database);
    var resultsTrimmed = [];
    if(results[0].length > 500){
      for(var i = results[0].length - 1; i >= 0; i--){
        if(i % 10 == 0){
          resultsTrimmed.push(results[0][i]);
          console.log('RESULTS ----- ' + results[0][i].id);
        }
      }
    } else{
        resultsTrimmed = results[0].reverse();
    }
    console.log("these are trimmed results ------------------:" + resultsTrimmed);
    const datesAvail = skimDates(resultsTrimmed);
      res.render(view, {
        data: resultsTrimmed,
        database: database,
        table: table,
        tables: tables,
        dates: datesAvail
      });
  },

  retrieveTableIds: async function(req, res) {
    const database = req.params.database;
    const table = req.params.table;
    const start = req.query.start;
    const end = req.query.end;
    const query = ["SELECT * FROM " +table +" WHERE id BETWEEN " +start +" AND " +end +";"];
    const view = 'dashboard'
    
    const tables = await returnTables(req, res);
    const results = await connectDb(query, database);
    var resultsTrimmed = [];
    if(results[0].length > 500){
      for(var i = results[0].length - 1; i >= 0; i--){
        if(i % 10 == 0){
          resultsTrimmed.push(results[0][i]);
          console.log('RESULTS ----- ' + results[0][i].id);
        }
      }
    } else{
        resultsTrimmed = results[0].reverse();
    }
    const datesAvail = skimDates(resultsTrimmed);
      res.render(view, {
        data: resultsTrimmed,
        database: database,
        table: table,
        tables: tables,
        dates: datesAvail
      });
  },
}

module.exports = controller;
