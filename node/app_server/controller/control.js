var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
/* GET 'control' pages */
module.exports.control = function(req, res) {
  res.render('control', { title: 'Aquaponics System Control' });
};

module.exports.single = function(req, res) {
  res.render('single', { title: 'Single Component Control' });
};

module.exports.process = function(req, res) {
  res.render('process', { title: 'Process Control' });
};
