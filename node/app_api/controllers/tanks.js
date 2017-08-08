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
      sendJsonResponse(res, 200, tanks);
    });
}

module.exports.fishTanks = function(req, res) { 
  tankModel
    .find({"tankType" : "fish"})
    .exec(function(err, tanks) {
      sendJsonResponse(res, 200, tanks);
    });
}

module.exports.biofilterTanks = function(req, res) { 
  tankModel
    .find({"tankType" : "biofilter"})
    .exec(function(err, tanks) {
      sendJsonResponse(res, 200, tanks);
    });
};

module.exports.reservoirTanks = function(req, res) { 
  tankModel
    .find({"tankType" : "reservoir"})
    .exec(function(err, tanks) {
      sendJsonResponse(res, 200, tanks);
    });
};

module.exports.tankByName = function(req, res) {
  if (req.params.tankName) {
		tankModel
			.find({"tankName" : req.params.tankName})
			.exec(function(err, tanks) {
        if (!tanks.length) {
          sendJsonResponse(res, 404, { "message" : "tank not found" });
          console.log("tank not found error");
          return;
        }
        else if (err) { 
          sendJsonResponse(res, 404, err);
          console.log("error object passed down");
          return;
        }
				sendJsonResponse(res, 200, tanks);
			})
  }
  else {
    sendJsonResponse(res, 404, { "message" : "No tank name in request" });
    console.log("No tank name in request");
  }
}

module.exports.tankCreate = function(req, res) {
  tankModel.create({
    tankName: req.body.tankName,
    tankType: req.body.tankType,
    tankNumber: req.body.tankNumber,
    phData: [],
    doData: [],
    ecData: [],
    wtempData: [],
    wlvlData: [],
  }, function(err, tank) {
    if(err) {
      sendJsonResponse(res, 400, err);
    }
    else {
      sendJsonResponse(res, 201, tank);
    }
  })
}

module.exports.delById = function(req, res) {
  if(req.params.tankId) {
		tankModel
			.findByIdAndRemove(req.params.tankId)
			.exec(function(err, tank) {
				if(err){
					sendJsonResponse(res, 400, err);
					return;
				} 
				sendJsonResponse(res, 204, null);
			})
  } else {
    sendJsonResponse(res, 400, {"message" : "no tank id"});
  }
}

module.exports.delByName = function(req, res) {
  if(req.params.tankName) {
    tankModel.findOne({"tankName" : req.params.tankName}).remove().exec(function(err, tank) {
      sendJsonResponse(res, 204, null);
    })
  } else {
    sendJsonResponse(res, 400, {"message" : "no tank name in request"});
  } 
}
