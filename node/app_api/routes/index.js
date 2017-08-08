var express = require('express');
var router = express.Router();

var ctrlTanks = require('../controllers/tanks');
var ctrlStats = require('../controllers/stats');
var ctrlLogs = require('../controllers/logs');

//tanks api route definitions
router.get('/tanks/', ctrlTanks.allTanks);
router.get('/tanks/fish', ctrlTanks.fishTanks);
router.get('/tanks/biofilter', ctrlTanks.biofilterTanks);
router.get('/tanks/reservoir', ctrlTanks.reservoirTanks);
router.get('/tanks/name/:tankName', ctrlTanks.tankByName);

router.post('/tanks', ctrlTanks.tankCreate);

router.delete('/tanks/id/:tankId', ctrlTanks.delById);
router.delete('/tanks/name/:tankName', ctrlTanks.delByName);

//stats api route definitions
router.get('/stats/read/name/:tankName/:statName', ctrlStats.statByName);
router.get('/stats/read/id/:tankId/:statName', ctrlStats.statById);

router.post('/stats/id/:tankId/stat/:stat', ctrlStats.statAddById);
router.post('/stats/name/:tankName/stat/:stat', ctrlStats.statAddByName);

//logs api route definitions
router.get('/logs', ctrlLogs.allLogs);
router.get('/logs/system', ctrlLogs.systemLogs);
router.get('/logs/user', ctrlLogs.userLogs);

router.post('/logs/new/user', ctrlLogs.addUser);
router.post('/logs/new/system', ctrlLogs.addSystem);

module.exports = router;
