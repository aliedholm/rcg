var mongoose = require('mongoose');
var tankModel = mongoose.model('tank');

var sendJsonResponse = function(res, status, content){ 
  res.status(status);
  res.json(content);
};

module.exports.tankById = function(req, res) { 
  tankModel
    .find()
    .exec(function(err, tanks) {
      sendJsonResponse(res, 200, tanks);
    })
}

module.exports.testAdd = function(req, res) {
  if(req.params.testNumber) {
    tankModel
      .findById(req.params.testNumber)
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
    
