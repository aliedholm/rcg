var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderPage = function(req, res, template, title, body) {
  res.render(template, {
    "title" : title,
    "logs" : body});
};

/* GET 'logs' pages */
module.exports.logs = function(req, res) {
  var title = "All Aquaponics Logs";
  var template = "logs";
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
      renderPage(req, res, template, title, body);
    })  
};

module.exports.systemLogs = function(req, res) {
  var title = "All Aquaponics System Logs";
  var template = "logs";
  var requestOptions, path;
  path = '/api/logs/system';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderPage(req, res, template, title, body);
    })  
};

module.exports.userLogs = function(req, res) {
  var title = "All Aquaponics User Logs";
  var template = "logs";
  var requestOptions, path;
  path = '/api/logs/user';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderPage(req, res, template, title, body);
    })  
};
