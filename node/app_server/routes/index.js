var express = require('express');
var router = express.Router();
var ctrlDashboard = require('../controller/dashboard');
var ctrlLogs = require('../controller/logs');
var ctrlReporting = require('../controller/reporting');
var ctrlSettings = require('../controller/settings');
var ctrlControl = require('../controller/control');

/* Home Page Dashboard */
router.get('/', ctrlDashboard.dashboard);

/* Logs Pages */
router.get('/logs', ctrlLogs.logs);
router.get('/logs/system', ctrlLogs.systemLogs);
router.get('/logs/user', ctrlLogs.userLogs);

/* Reporting Pages */
router.get('/reporting', ctrlReporting.allTanks);
router.get('/reporting/fish', ctrlReporting.fish);
router.get('/reporting/biofilter', ctrlReporting.biofilter);
router.get('/reporting/reservoir', ctrlReporting.reservoir);
router.get('/reporting/tank/:tankName', ctrlReporting.tankByName);

/* Control Pages */
router.get('/control', ctrlControl.control);
router.get('/control/single', ctrlControl.single);
router.get('/control/process', ctrlControl.process);

/* Settings Pages */
router.get('/settings', ctrlSettings.settings);
router.get('/settings/reporting', ctrlSettings.reportingSettings);
router.get('/settings/control', ctrlSettings.controlSettings);

module.exports = router;
