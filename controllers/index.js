var Post = require('../models/post');

exports.get_index = function(req, res, next) {
  Post.find({project: true}, function (err, posts) {
    if (err) {
      console.log(err);
      post.sanitizedHtml = 'Hay un problema, no se ha encontrado el proyecto';
    }
    if (!posts) {
      post.sanitizedHtml = 'Hay un problema, no se ha encontrado el proyecto';
    }
    res.render('index', {posts});
  });
}
