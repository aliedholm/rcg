var express = require('express');
var router = express.Router();
var ctrlMain = require('../controller/main');

var homepageController = function (req, res) {
  res.render('index', { title: 'Express' });
};

/* GET home page. */
router.get('/', ctrlMain.index); 

module.exports = router;
