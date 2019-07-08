//filename: routes.js

var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/index.js');

router.get('/', function(req, res){
  req.params.database = 'sensors';
  ctrl.retrieveTables(req, res);
});

router.get('/postReading/:database-:table', function(req, res){
  ctrl.logData(req, res);
});

router.get('/postLog/:database-:table', function(req, res){
  ctrl.logMessage(req, res);
});

router.get('/tables/:database', function(req, res){
  ctrl.retrieveTables(req, res);
});

router.get('/retrieveTable/:database-:table', function(req, res){
  ctrl.retrieveTable(req, res);
});

router.get('/retrieveTableDates/:database-:table', function(req, res){
  ctrl.retrieveTableDates(req, res);
});

router.get('/retrieveTableIds/:database-:table', function(req, res){
  ctrl.retrieveTableIds(req, res);
});

module.exports = router;
