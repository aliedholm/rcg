/* GET 'dashboard home' pages */
module.exports.dashboard = function(req, res) {
  res.render('dashboard', { title: 'Rogers Community Garden Aquaponics System' });
};
