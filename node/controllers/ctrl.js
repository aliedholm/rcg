//filename: queryController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

//function to create and do arithmetic on date objects
datePlus = function(rawDate, days){
  var dateParts = rawDate.split("-");
  var day = parseInt(dateParts[2]);
  var dur = parseInt(days);
  var newDay = day + dur;
  dateParts[2] = newDay;
  var dateObjectEnd = (dateParts[0] + "-" + dateParts[1] + "-" + dateParts[2]);
  return dateObjectEnd;
}

//function to extract the complete set of dates from a set of data
skimDates = function(array){
  let dates = [];
  for(var i = array.length - 1; i >= 0; i--){
    const dateRaw = JSON.stringify(array[i].datetime);
    let date = dateRaw.substring(1, 11);
    if(dates.indexOf(date) == -1){
      dates.push(date);
    }
  }
  return dates;
}

//defnining the actuall controller and its methods
let controller = {
  renderHomepage: async function(req, res){
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
    console.log("results from CTRL of what is being sent to the view for the sensors of the page: " + sensors)
    const view = 'dashboard';
      res.render(view, {
        sensors: sensors
      });
  }
}

module.exports = controller;
