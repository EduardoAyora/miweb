var Post = require('../models/post');
const fs = require('fs');
var rimraf = require("rimraf");

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

exports.redirect_edit_image = function(req, res, next) {
  res.redirect('/blog/images/' + req.post.id);
}

exports.get_edit_images = function(req, res, next) {
  const success = req.flash('success') || [];
  const errors = req.flash().error || [];
  Post.findById(req.params.postId, function (err, post) {
    if (err) {
      console.log(err);
      next(err);
    }
    if (!post) {
      req.flash('error', 'Este post no fue encontrado');
      return res.redirect('/blog/edit-blog');
    }
    fs.readdir('public/images/blog/' + post.url + '/', (err, files) => {
      res.render('blog/edit-images', { post: post, files, errors, success });
    });
  });
}

exports.post_add_post = function(req, res, next) {
  req.post = new Post();
  next();
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

exports.post_image = function(req, res, next) {
  Post.findById({_id: req.params.id}, function (err, post) {
    if (err) {
      console.log(err);
      next(err);
    }
    req.post = post;
    // Es necesario que la carpeta blog este creada para que funcione
    const dir = `public/images/blog/${req.post.url}`;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    next();
  });
}

exports.delete_post = function(req, res, next) {
  Post.findByIdAndDelete({_id: req.params.id}, function (err, post) {
    if (err) {
      console.log(err);
      req.flash('error', err);
      next(err);
    }
    rimraf(`public/images/blog/${post.url}`, function () {
      req.flash('success', 'El post se ha eliminado con éxito');
      res.redirect('/blog/edit-blog');
    });
  });
}

exports.delete_image = function(req, res, next) {
  Post.findById({_id: req.params.postId}, function (err, post) {
    if (err) {
      console.log(err);
      next(err);
    }
    req.post = post;
    const dir = `public/images/blog/${post.url}/${req.body.file}`;
    fs.unlink(dir, function(err){
      if(err) {
        console.log(err);
        next(err);
      }
      req.flash('success', 'La imagen se ha eliminado con éxito');
      next();
    });
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
