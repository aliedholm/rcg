//filename: pageRoutes.js

var express = require('express');
var router = express.Router();

const logCtrl = require('../controllers/logCtrl.js');
const queryCtrl = require('../controllers/queryCtrl.js');
const compostCtrl = require('../controllers/compostCtrl.js');

router.get('/', function(req, res){
  req.params.database = 'sensors';
  req.params.table = 'temp1';
  queryCtrl.retrieveTable(req, res);
});

//posting data to the database
router.post('/post/reading/:database-:table', function(req, res){logCtrl.logData(req, res);});
router.post('/post/log/:database-:table', function(req, res){logCtrl.logMessage(req, res);});
router.post('/post/compost', function(req, res){compostCtrl.logRestaurant(req, res);});

//retrieving data from the database
router.get('/tables/:database', function(req, res){queryCtrl.retrieveTables(req, res);});
router.get('/retrieveTable/:database-:table', function(req, res){queryCtrl.retrieveTable(req, res);});
router.get('/retrieveTableDates/:database-:table', function(req, res){queryCtrl.retrieveTableDates(req, res);});
router.get('/retrieveTableIds/:database-:table', function(req, res){queryCtrl.retrieveTableIds(req, res);});
router.get('/compost/:restaurant', function(req, res){compostCtrl.pullRestaurant(req, res);});
router.get('/logCompost', function(req, res){compostCtrl.logCompost});
router.get('/post/compost/:database-:restaurant', function(req, res){compostCtrl.logRestaurant(req, res);});
module.exports = router;
