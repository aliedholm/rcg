/* GET 'settings' pages */
module.exports.settings = function(req, res) {
  res.render('settings', { title: 'Aquaponics System Settings' });
};
