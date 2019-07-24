//filename: pageRoutes.js

var express = require('express');
var router = express.Router();

var ctrl = require('../controllers/ctrl.js')

router.get('/', function(req, res){
  req.params.database = 'sensors';
  req.params.table = 'temp1';
  ctrl.renderHomepage(req, res)  
});

module.exports = router;
