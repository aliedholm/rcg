//filename: queryController.js
let bodyparser = require('body-parser');
const dbUtilities = require('../db/db.js');

//defnining the actuall controller and its methods
let controller = {
  renderHomepage: async function(req, res){
    const database = req.params.database;
    const table = req.params.table;
    const view = 'dashboard'; 
      res.render(view, {
        database: database,
        table: table,
      });
  }
}

module.exports = controller;
