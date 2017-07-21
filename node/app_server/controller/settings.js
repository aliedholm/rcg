/* GET 'settings' pages */
module.exports.settings = function(req, res) {
  res.render('settings', { title: 'Aquaponics System Settings' });
};

module.exports.reportingSettings = function(req, res) {
  res.render('reportingSettings', { title: 'Aquaponics Reporting System Settings' });
};

module.exports.controlSettings = function(req, res) {
  res.render('controlSettings', { title: 'Aquaponics Control System Settings' });
};
