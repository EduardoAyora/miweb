var Post = require('../models/post');

exports.get_index = function(req, res, next) {
  Post.findOne({url: 'administrador-de-blog'}, function (err, post) {
    if (err) {
      console.log(err);
      post.sanitizedHtml = 'Hay un problema, no se ha encontrado el proyecto';
    }
    if (!post) {
      post.sanitizedHtml = 'Hay un problema, no se ha encontrado el proyecto';
    }
    res.render('index', {post});
  });
}
