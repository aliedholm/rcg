//filename: routes.js

var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/index.js');

router.get('/postReading', function(req, res){
  ctrl.logData(req, res);
});

router.get('/postLog', function(req, res){
  ctrl.logMessage(req, res);
});

router.get('/tables', function(req, res){
  ctrl.listTables(req, res);
});

router.get('/retrieveTable', function(req, res){
  ctrl.retrieveTable(req, res);
});

module.exports = router;
