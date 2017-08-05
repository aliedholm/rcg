var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
/* GET 'logs' pages */

module.exports.logs = function(req, res) {
  res.render('logs', { title: 'Logs' });
};

module.exports.systemLogs = function(req, res) {
  res.render('systemLogs', { title: 'System Logs' });
};

module.exports.userLogs = function(req, res) {
  res.render('userLogs', { title: 'User Logs' });
};
