//filename: pageRoutes.js

var express = require('express');
var router = express.Router();

const logCtrl = require('../controllers/logCtrl.js');
const queryCtrl = require('../controllers/queryCtrl.js');

router.get('/', function(req, res){
  req.params.database = 'sensors';
  req.params.table = 'temp1';
  const view = 'dashboard';
  res.render(view, {
    title: 'rufSensor'
  });
//  queryCtrl.retrieveTable(req, res);
});

//posting data to the database
router.post('/post/reading/:database-:table', function(req, res){logCtrl.logData(req, res);});
router.post('/post/log/:database-:table', function(req, res){logCtrl.logMessage(req, res);});

//retrieving data from the database
router.get('/tables/:database', function(req, res){queryCtrl.retrieveTables(req, res);});
router.get('/retrieveTable/:database-:table', function(req, res){queryCtrl.retrieveTable(req, res);});
router.get('/retrieveTableDates/:database-:table', function(req, res){queryCtrl.retrieveTableDates(req, res);});
router.get('/retrieveTableIds/:database-:table', function(req, res){queryCtrl.retrieveTableIds(req, res);});

module.exports = router;
