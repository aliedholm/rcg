//filename: apiQueryController.js
let bodyparser = require('body-parser');
var jStat = require('jStat').jStat;
const dbUtilities = require('../db/db.js');

const freq = 50;

//defnining the actual controller and its methods
let controller = {
  retrieveTables: async function(req, res){
    const database = req.params.database;
    const query = [
      'SHOW TABLES FROM ' +database +';',
    ];
    const results = await connectDb(query, database);
    const tables = results[0];
    var sensors = [];
    for(var i = 0; i < tables.length; i++){
      sensors.push(tables[i].Tables_in_sensors);
    } 
    res.send(sensors);
  },

  retrieveTable: async function(req, res){
    const database = req.params.database;
    const table = req.params.table;
    const query = [
      'SELECT * FROM ' +table +';'
    ];
    const results = await connectDb(query, database);
    let resultsTrimmed = [];
    if(results[0].length > 500){
      for(var i = results[0].length; i > 0; i--){
        if(i % freq == 0){
          resultsTrimmed.push(results[0][i]);
        }
      }
    } else{
        resultsTrimmed = results[0].reverse();
    }
      res.send(resultsTrimmed);
  },
  
  retrieveDates: async function(req, res){
    const database = req.params.database;
    const table = req.params.table;
    const query = [
      'SELECT DISTINCT DATE(datetime) FROM ' +table +';'
    ];
    const results = await connectDb(query, database);
    var dates = [];
    var keyName = "Date(datetime)";
    for(var i = 0; i < results[0].length; i++){
      date = Object.values(results[0][i]);
      dates.push(date[0]);
    } 
      res.send(dates.reverse());
  },

  retrieveTableDates: async function(req, res) {
    const database = req.params.database;
    const table = req.params.table;
    const start = req.query.start;
    const end = req.query.end;
    const query = [
      "SELECT * FROM " +table +" WHERE datetime BETWEEN '" +start + "' AND '" +end +"';"
    ];
    const results = await connectDb(query, database);
    var resultsTrimmed = [];
    if(results[0].length > 500){
      for(var i = results[0].length - 1; i >= 0; i--){
        if(i % freq == 0){
          resultsTrimmed.push(results[0][i]);
        }
      }
    } else{
        resultsTrimmed = results[0].reverse();
    }
      resultsTrimmed = calcStats(resultsTrimmed);
      res.send(resultsTrimmed);
  },
}

//function to calculate stats object and attach it to outgoing data
var calcStats = function(dataSet){
  var stats = {};
  var justNumbers = [];
  for(var i = 0; i < dataSet.length - 1; i++){
    justNumbers.push(dataSet[i].reading);
  }
  stats.min = jStat.min(justNumbers);
  stats.max = jStat.max(justNumbers);
  stats.mean = jStat.mean(justNumbers);
  console.log("From inside calcStats Mean: " + JSON.stringify(stats));
  dataSet.push(stats);
  return dataSet;
}

module.exports = controller;
