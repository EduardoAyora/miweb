exports.get_blog = function(req, res, next) {
  res.render('blog/blog');
}

exports.get_add_blog = function(req, res, next) {
  res.render('blog/add-blog');
}
