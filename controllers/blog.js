var Post = require('../models/post');
const fs = require('fs');

exports.get_blog = function(req, res, next) {
  const success = req.flash('success') || [];
  const errors = req.flash().error || [];
  Post.find({}, function (err, posts) {
    if (err) { return err }
    res.render('blog/blog', {posts, errors, success});
  });
}

exports.get_add_blog = function(req, res, next) {
  res.render('blog/add-blog');
}

exports.post_add_blog = function(req, res, next) {
  const title = req.body.title;
  const url = req.body.url;
  Post.findOne({ url: url }, function (err, post) {
    if (err) { return err }
    if (post) {
      req.flash('error', 'Esta url ya existe');
      return res.redirect('/blog');
    }
    const newPost = new Post();
    newPost.title = title;
    newPost.url = url;
    newPost.save(function(error, newPost){
      if (err) { return err }
      else {
        fs.readFile(`views/blog/posts/PLANTILLA.pug`, 'utf-8', (err, data) => {
          if(err) {
            if (err) { return err }
          }
          fs.appendFile(`views/blog/posts/${url}.pug`, `${data}`, (err) => {
            if (err) { return err }
            req.flash('success', 'El post se ha creado con éxito');
            res.redirect('/blog');
          });
        });
      }
    });
  });
}

exports.get_blog_url = function(req, res, next) {
  res.render(`blog/posts/${req.params.url}`);
}
