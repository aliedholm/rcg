var express = require('express');
var router = express.Router();

var ctrlTanks = require('../controllers/tanks');
var ctrlTest = require('../controllers/test');

//tanks api definitions
router.get('/tanks/', ctrlTanks.allTanks);
router.get('/tanks/fish', ctrlTanks.fishTanks);
router.get('/tanks/biofilter', ctrlTanks.biofilterTanks);
router.get('/tanks/reservoir', ctrlTanks.reservoirTanks);
router.get('/tanks/name/:tankName', ctrlTanks.tankByName);
router.get('/tanks/name', ctrlTanks.tankByName);

router.get('/stats', ctrlTanks.tankStats);
router.get('/stats/:tankName', ctrlTanks.tankStats);
router.get('/stats/:tankName/:stat', ctrlTanks.tankStats);

router.post('/tanks', ctrlTanks.tankCreate);
router.post('/tanks/:tankName', ctrlTanks.statAdd);
router.post('/tanks/:tankName/stats', ctrlTanks.statAdd);
router.post('/tanks/:tankName/stats/:statName', ctrlTanks.statAdd);

router.post('/test/:testNumber', ctrlTest.tankById);
router.post('/test/:testNumber/stat/:stat', ctrlTest.testAdd);

module.exports = router;
