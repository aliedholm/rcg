var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderPage = function(req, res, template, title, body) {
  res.render(template, {
    "title" : title,
    "tanks" : body});
};

/* GET 'reporting' pages */
module.exports.allTanks = function(req, res) {
  var title = "All Aquaponics Tanks";
  var template = "tanks";
  var requestOptions, path;
  path = '/api/tanks';
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
    }
  );
};

module.exports.fish = function(req, res) {
  var title = "All Fish Tanks";
  var template = "tanks";
  var requestOptions, path;
  path = '/api/tanks/fish';
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
    }
  );
};

module.exports.biofilter = function(req, res) {
  var title = "All Biofilter Tanks";
  var template = "tanks";
  var requestOptions, path;
  path = '/api/tanks/biofilter';
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
    }
  );
};

module.exports.reservoir = function(req, res) {
  var title = "All Reservoir Tanks";
  var template = "tanks";
  var requestOptions, path;
  path = '/api/tanks/reservoir';
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
    }
  );
};

module.exports.tankByName = function(req, res) {
  var template = "tankByName";
  var requestOptions, path;
  path = '/api/tanks/name/' + req.params.tankName;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderPage(req, res, template, body);
    }
  );
};
