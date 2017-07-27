var mongoose = require('mongoose');
var tankModel = mongoose.model('tank');

var sendJsonResponse = function(res, status, content){ 
  res.status(status);
  res.json(content);
};

module.exports.allTanks = function(req, res) { 
  tankModel
    .find()
    .exec(function(err, tanks) {
      sendJsonResponse(res, 200, {"status" : tanks})
    })
}

module.exports.fishTanks = function(req, res) { 
  sendJsonResponse(res, 200, {"status" : "success"})
};

module.exports.biofilterTanks = function(req, res) { 
  sendJsonResponse(res, 200, {"status" : "success"})
};

module.exports.reservoirTanks = function(req, res) { 
  sendJsonResponse(res, 200, {"status" : "success"})
};
