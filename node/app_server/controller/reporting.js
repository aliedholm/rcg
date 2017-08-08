var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderPage = function(req, res, template, title, body) {
  res.render(template, {
    "title" : title,
    "tanks" : body});
};

var _showError = function(req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "The page that you are looking for cannot be found";
  } else {
    title = status + ", something's gone wrong";
    content = "something has gone wrong";
  }
  res.status(status);
  res.render('error', {
    title: title,
    content: content
  });
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
      var data = body;
      if(response.statusCode === 200) {
        renderPage(req, res, template, title, data);
      } else {
        _showError(req, res, response.statusCode);
      }
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
      var data = body;
      if(response.statusCode === 200) {
        renderPage(req, res, template, title, data);
      } else {
        _showError(req, res, response.statusCode);
      }
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
      var data = body;
      if(response.statusCode === 200) {
        renderPage(req, res, template, title, data);
      } else {
        _showError(req, res, response.statusCode);
      }
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
      var data = body;
      if(response.statusCode === 200) {
        renderPage(req, res, template, title, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

module.exports.tankByName = function(req, res) {
  var title = req.params.tankName;
  var template = "tanks";
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
      var data = body;
      if(response.statusCode === 200) {
        renderPage(req, res, template, title, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

module.exports.newTank = function(req, res){
  var title = "Add New Tank";
  var template = "newTank";
  var requestOptions, path;
  path = '/api/tanks';
  var postData = {
    tankName: req.body.tankName,
    tankType: req.body.tankType,
    tankNumber: req.body.tankNumber
  }
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postData,
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      renderPage(req, res, template, title, data);
    }
  );
}

module.exports.deleteTank = function(req, res){
  var title = "Delete Tanks";
  var template = "deleteTank";
  var tankId = req.body.tankId;
  var requestOptions, path;
  path = '/api/tanks/id/' + tankId;
  requestOptions = {
    url : apiOptions.server + path,
    method : "DELETE",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      renderPage(req, res, template, title, data);
    }
  );
}
