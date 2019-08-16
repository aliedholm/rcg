//filename: pageRoutes.js

var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/ctrl.js');

router.get('/', function(req, res){
  req.params.database = 'sensors';
  req.params.table = 'temp1';
  const view = 'dashboard';
  res.render(view, {
    title: 'rufSensor'
  });
//  queryCtrl.retrieveTables(req, res);
});

module.exports = router;
