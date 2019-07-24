//filename: queryController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

//defnining the actuall controller and its methods
let controller = {
  renderHomepage: async function(req, res){
    const database = req.params.database;
    const table = req.params.table;
    const query = [
      'SHOW TABLES FROM ' +database +';',
      'SELECT * FROM ' +table +';'
    ];
    const view = 'dashboard'; 
    const results = await connectDb(query, database);
    const tables = results[0];
    let resultsTrimmed = [];
      res.render(view, {
        database: database,
        table: table,
        tables: tables
      });
  }
}

module.exports = controller;
