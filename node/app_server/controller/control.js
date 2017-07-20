/* GET 'control' pages */
module.exports.control = function(req, res) {
  res.render('control', { title: 'Aquaponics System Control' });
};

module.exports.single = function(req, res) {
  res.render('index', { title: 'Single Component Control' });
};

module.exports.process = function(req, res) {
  res.render('index', { title: 'Process Control' });
};
