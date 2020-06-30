var User = require('../models/user');
var passport = require('passport');

exports.get_login = function(req, res, next) {
  res.render('user/login');
}

exports.get_signup = function(req, res, next) {
  res.render('user/signup', mssgs = {
    error: req.flash('error')
  });
}

exports.post_signup = function(req, res, next) {
  User.register(new User({username: req.body.username}),
    req.body.password, (err, user) => {
    if(err) {
      console.log('Hubo un problema');
      req.flash('error', 'Hubo un problema al crear su cuenta');
      res.redirect('signup');
    }
    else {
      req.flash('error', 'Te has registrado con éxito');
      res.redirect('signup');
    }
  });
}
