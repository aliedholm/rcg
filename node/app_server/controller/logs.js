var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderPage = function(req, res, body) {
  res.render('logs', {"logs" : body});
};

/* GET 'logs' pages */
module.exports.logs = function(req, res) {
  var requestOptions, path;
  path = '/api/logs';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderPage(req, res, body);
    })  
};

module.exports.systemLogs = function(req, res) {
  res.render('systemLogs', { title: 'System Logs' });
};

module.exports.userLogs = function(req, res) {
  res.render('userLogs', { title: 'User Logs' });
};
