//filename: routes.js

var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/index.js');


router.get('/postReading', ctrl.logData);

router.get('/api', (req, res) => res.send("sent from routes file"));

module.exports = router;
