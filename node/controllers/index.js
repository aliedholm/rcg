//filename: controller.js

let db = require('../db/index.js');

let controller = {
  logData: function(req, res) {
    console.log('controller was hit');
    postReading();
  }
};

module.exports = controller;
