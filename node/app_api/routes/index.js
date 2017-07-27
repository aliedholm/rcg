var express = require('express');
var router = express.Router();

var ctrlTanks = require('../controllers/tanks');

//tanks api definitions
router.get('/tanks', ctrlTanks.allTanks);
router.get('/tanks/fish', ctrlTanks.fishTanks);
router.get('/tanks/biofilter', ctrlTanks.biofilterTanks);
router.get('/tanks/reservoir', ctrlTanks.reservoirTanks);

module.exports = router;
