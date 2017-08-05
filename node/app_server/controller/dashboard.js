var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
/* GET 'dashboard home' pages */
module.exports.dashboard = function(req, res) {
  res.render('dashboard', { title: 'Rogers Community Garden Aquaponics System' });
};
