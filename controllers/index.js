exports.get_index = function(req, res, next) {
  res.render('index');
}

exports.get_blog = function(req, res, next) {
  res.render('blog');
}
