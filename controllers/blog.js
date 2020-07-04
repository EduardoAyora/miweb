var Post = require('../models/post');
const fs = require('fs');

exports.get_blog = function(req, res, next) {
  const success = req.flash('success') || [];
  const errors = req.flash().error || [];
  Post.find({}, {
    title: 'title',
    createdAt: 'createdAt',
    url: 'url'
  }, function (err, posts) {
    if (err) { return err }
    res.render('blog/blog', {posts, errors, success});
  }).sort({
    createdAt: 'desc'
  });
}

exports.get_add_blog = function(req, res, next) {
  res.render('blog/add-blog', { post: new Post() });
}

exports.post_add_blog = function(req, res, next) {
  const title = req.body.title;
  const content = req.body.content;
  const newPost = new Post({
    title: title,
    content: content
  });
  newPost.save(function(error, post){
    if (error) {
      console.log(error);
      res.render('blog/add-blog', { post: newPost });
    }
    else {
      req.flash('success', 'El post se ha creado con éxito');
      res.redirect('/blog');
    }
  });
}

exports.get_blog_url = function(req, res, next) {
  Post.findOne({url: req.params.url}, function (err, post) {
    if (err) { return err }
    if (!post) {
      req.flash('error', 'Este post no fue encontrado');
      return res.redirect('/blog');
    }
    console.log(post);
    res.render('blog/post', {post});
  });
}
