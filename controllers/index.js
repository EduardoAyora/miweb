exports.get_index = function(req, res, next) {
  res.render('index', { title: 'Express' });
}

exports.post_index = function(req, res, next) {
  res.redirect('/');
}
