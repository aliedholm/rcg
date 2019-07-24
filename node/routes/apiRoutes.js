//filename: apiRoutes.js

var express = require('express');
var router = express.Router();

const apiLogCtrl = require('../controllers/apiLogCtrl.js');
const apiQueryCtrl = require('../controllers/apiQueryCtrl.js');

//posting data to the database
router.post('/post/reading/:database-:table', function(req, res){apiLogCtrl.logData(req, res);});
router.post('/post/log/:database-:table', function(req, res){apiLogCtrl.logMessage(req, res);});

//retrieving data from the database
router.get('/retrieveTables/:database', function(req, res){apiQueryCtrl.retrieveTables(req, res);});
router.get('/retrieveTable/:database-:table', function(req, res){apiQueryCtrl.retrieveTable(req, res);});
router.get('/retrieveTableDates/:database-:table', function(req, res){apiQueryCtrl.retrieveTableDates(req, res);});
router.get('/retrieveTableIds/:database-:table', function(req, res){apiQueryCtrl.retrieveTableIds(req, res);});

module.exports = router;
