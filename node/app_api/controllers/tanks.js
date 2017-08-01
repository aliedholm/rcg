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

module.exports.tankByName = function(req, res) {
  if (req.params.tankName) {
		tankModel
			.find({"tankName" : req.params.tankName})
			.exec(function(err, tankData) {
        if (!tankData.length) {
          sendJsonResponse(res, 404, { "message" : "tank not found" });
          console.log("tank not found error");
          return;
        }
        else if (err) { 
          sendJsonResponse(res, 404, err);
          console.log("error object passed down");
          return;
        }
				sendJsonResponse(res, 200, {"status" : tankData});
			})
  }
  else {
    sendJsonResponse(res, 404, { "message" : "No tank name in request" });
    console.log("No tank name in request");
  }
}

module.exports.tankStats = function(req, res) {
  if(req.params.tankName && req.params.stat) {
		tankModel
			.find({"tankName" : req.params.tankName})
			.select(req.params.stat)
			.exec(function(err, data) {
        if(!data) {
          sendJsonResponse(res, 404, {"message" : "data not found"});
          return;
        }
        else if(err) {
          sendJsonResponse(res, 404, err);
          return;
        }
				sendJsonResponse(res, 200, {"status" : data})
			})
  }
  else {
    sendJsonResponse(res, 404, {"message" : "incomplete request"});
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

module.exports.statAdd = function(req, res) {
  var tankName = req.params.tankName;
  var statName = req.params.statName;
  if (tankName && statName) {
		tankModel
			.find({"tankName" : req.params.tankName})
      .select(statName)
			.exec(function(err, statData) {
        if (!statData.length) {
          sendJsonResponse(res, 404, { "message" : "tank not found" });
          console.log("tank not found error");
          return;
        }
        else if (err) { 
          sendJsonResponse(res, 404, err);
          console.log("error object passed down");
          return;
        }
        doAddData(req, res, statData);
			})
  }
  else {
    sendJsonResponse(res, 404, { "message" : "No tank name and/or stat in request" });
    console.log("No tank name and/or stat in request");
  }
}

var doAddData = function(req, res, tankData) {
  if(!tankData) {
    sendJsonResponse(res, 404, {"message" : "tank not found"});
  } else {
    tankData.push({
      timestamp: new Date(),
      reading: req.body.reading
    });
  }
  sendJsonResponse(res, 201, tankData);
  tankData.save(function(err, tankData) {
    var thisData;
    if(err) {
      sendJsonResponse(res, 400, err);
    } else {
      thisData = tankData.statName[tankData.statName.length - 1];
      sendJsonResponse(res, 201, thisData);
    }
  });
}   
