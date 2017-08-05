var mongoose = require('mongoose');
var tankModel = mongoose.model('tank');

var sendJsonResponse = function(res, status, content){ 
  res.status(status);
  res.json(content);
};

module.exports.statById = function(req, res) {
  if(req.params.tankId){
    tankModel
      .findById(req.params.tankId)
      .select(req.params.statName)
      .exec(function(err, tankData) {
        if(!tankData) {
          sendJsonResponse(res, 404, {"message" : "tank id not found in db"});
          return;
        } else if(err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, tankData);
      })
  } else {
      sendJsonResponse(res, 404, {"message" : "no tank id in request"});
  }
}


module.exports.statByName = function(req, res) {
  if(req.params.tankName){
    tankModel
      .find({"tankName" : req.params.tankName})
      .select(req.params.statName)
      .exec(function(err, tankData) {
        tankData = tankData[0];
        if(!tankData) {
          sendJsonResponse(res, 404, {"message" : "tank name not found in db"});
          return;
        } else if(err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, tankData);
      })
  } else {
      sendJsonResponse(res, 404, {"message" : "no tank id in request"});
  }
}

module.exports.statAddById = function(req, res) {
  if(req.params.tankId){
    tankModel
      .findById(req.params.tankId)
      .select(req.params.stat)
      .exec(function(err, tankData) {
        if(!tankData) {
          sendJsonResponse(res, 404, {"message" : "tank id not found in db"});
          return;
        } else if(err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        doAddData(req, res, tankData);
      })
  } else {
      sendJsonResponse(res, 404, {"message" : "no tank id in request"});
  }
}

module.exports.statAddByName = function(req, res) {
  if(req.params.tankName){
    tankModel
      .find({"tankName" : req.params.tankName})
      .select(req.params.stat)
      .exec(function(err, tankData) {
        tankData = tankData[0];
        if(!tankData) {
          sendJsonResponse(res, 404, {"message" : "tank name not found in db"});
          return;
        } else if(err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        doAddData(req, res, tankData);
      })
  } else {
      sendJsonResponse(res, 404, {"message" : "no tank id in request"});
  }
}

var doAddData = function(req, res, tankData) { 
  if(!tankData) {
    sendJsonResponse(res, 404, {"message" : "no tank data passed to doAddData"});
  } else {
    tankData[req.params.stat].push({
      timestamp: new Date(),
      reading: req.body.reading 
    });
    tankData.save(function(err, tankData) {
      var thisData;
      if(err) {
        sendJsonResponse(res, 400, err);
      } else {
        thisData = tankData[req.params.stat][tankData[req.params.stat].length - 1];
        sendJsonResponse(res, 201, thisData);
      }
    });
  }
};
    
