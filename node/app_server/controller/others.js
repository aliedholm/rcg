/* GET About Page */
module.exports.about = function(req, res) {
  res.render('index', { title: 'About' });
};
