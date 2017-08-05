var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderPage = function(req, res, body) {
  res.render('fish', {"tanks" : body});
};

/* GET 'reporting' pages */
module.exports.reporting = function(req, res) {
  res.render('reporting', { 
    title: 'Aquaponics Data',
    pageHeader: {
      title: 'Aquaponics Data',
      strapline: 'Set of data for the project'
    }
  });  
};

module.exports.fish = function(req, res) {
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
      renderPage(req, res, body);
    }
  );
};

module.exports.biofilter = function(req, res) {
  res.render('biofilter', { title: 'Biofilter Reporting' });
};

module.exports.reservoir = function(req, res) {
  res.render('reservoir', { title: 'Plant Reservoir Reporting' });
};
