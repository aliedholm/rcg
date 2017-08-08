var mongoose = require('mongoose');
var logModel = mongoose.model('log');

var sendJsonResponse = function(res, status, content){ 
  res.status(status);
  res.json(content);
};

module.exports.allLogs = function(req, res) {
  logModel
    .find()
    .exec(function(err, logs) {
      sendJsonResponse(res, 200, logs.reverse());
    })
}

module.exports.userLogs = function(req, res) {
  logModel
    .find({"logType" : "user"})
    .exec(function(err, logs) {
      sendJsonResponse(res, 200, logs.reverse());
    })
}

module.exports.systemLogs = function(req, res) {
  logModel
    .find({"logType" : "system"})
    .exec(function(err, logs) {
      sendJsonResponse(res, 200, logs.reverse());
    })
}

module.exports.addUser = function(req, res) {
  logModel.create({
    logType: "user",
    logTime: new Date(),
    logBody: req.body.log
  }, function(err, log) {
    if(err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, log);
    }
  })
}

module.exports.addSystem = function(req, res) {
  logModel.create({
    logType: "system",
    logTime: new Date(),
    logBody: req.body.log
  }, function(err, log) {
    if(err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, log);
    }
  })
}
