/* GET 'logs' pages */

module.exports.logs = function(req, res) {
  res.render('logs', { title: 'Logs' });
};

module.exports.systemLogs = function(req, res) {
  res.render('index', { title: 'System Logs' });
};

module.exports.userLogs = function(req, res) {
  res.render('index', { title: 'User Logs' });
};
