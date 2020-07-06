var Post = require('../models/post');
const fs = require('fs');

exports.get_blog = function(req, res, next) {
  const success = req.flash('success') || [];
  const errors = req.flash().error || [];
  Post.find({}, {
    title: 'title',
    createdAt: 'createdAt',
    url: 'url',
    description: 'description'
  }, function (err, posts) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render('blog/blog', {posts, errors, success});
  }).sort({
    createdAt: 'desc'
  });
}

exports.get_add_post = function(req, res, next) {
  res.render('blog/add-post', { post: new Post() });
}

exports.post_add_post = function(req, res, next) {
  req.post = new Post();
  next();
}

exports.get_blog_url = function(req, res, next) {
  Post.findOne({url: req.params.url}, function (err, post) {
    if (err) {
      console.log(err);
      next(err);
    }
    if (!post) {
      req.flash('error', 'Este post no fue encontrado');
      return res.redirect('/blog');
    }
    res.render('blog/post', {post});
  });
}

exports.get_edit_blog = function(req, res, next) {
  const success = req.flash('success') || [];
  const errors = req.flash().error || [];
  Post.find({}, {
    title: 'title',
    createdAt: 'createdAt',
    url: 'url',
    description: 'description'
  }, function (err, posts) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render('blog/edit-blog', {posts, errors, success});
  }).sort({
    createdAt: 'desc'
  });
}

exports.get_edit_post = function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log(err);
      next(err);
    }
    if (!post) {
      req.flash('error', 'Este post no fue encontrado');
      return res.redirect('/blog/edit-blog');
    }
    res.render('blog/edit-post', { post: post });
  });
}

exports.put_post = function(req, res, next) {
  Post.findById({_id: req.params.id}, function (err, post) {
    if (err) {
      console.log(err);
      next(err);
    }
    req.post = post;
    next();
  });
}

exports.delete_post = function(req, res, next) {
  Post.findByIdAndDelete({_id: req.params.id}, function (err, post) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.redirect('/blog/edit-blog');
  });
}

exports.saveArticleAndRedirect = function (path) {
  return (req, res, next) => {
    let newPost = req.post;
    newPost.title = req.body.title;
    newPost.content = req.body.content;
    newPost.description = req.body.description;
    newPost.save(function(error, post){
      if (error) {
        res.render(`blog/${path}`, { post: newPost, error });
      }
      else {
        res.redirect(`/blog/${post.url}`);
      }
    });
  }
}
