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
  const content = req.body.content;
  Post.findOne({ url: url }, function (err, post) {
    if (err) { return err }
    if (post) {
      req.flash('error', 'Esta url ya existe');
      return res.redirect('/blog');
    }
    const newPost = new Post({
      title: title,
      url: url,
      content: content
    });
    newPost.save(function(error, newPost){
      if (error) { return error }
      else {
        req.flash('success', 'El post se ha creado con éxito');
        res.redirect('/blog');
      }
    });
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

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    let ext = file.mimetype.split('/');
    ext = ext[1];
    ext = ext.split('+');
    ext = ext[0];
    cb(null, 'index.' + ext);
  }
});

const imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    return cb(new Error('Solo puedes subir imágenes'), false);
  }
  cb(null, true);
};

exports.upload = multer({ storage: storage, fileFilter: imageFileFilter});
