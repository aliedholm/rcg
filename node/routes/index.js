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

router.get('/api', (req, res) => res.send("sent from routes file"));

module.exports = router;
