var User = require('../models/user');
var passport = require('passport');

exports.get_login = function(req, res, next) {
  const success = req.flash('success') || [];
  const errors = req.flash().error || [];
  res.render('user/login', {errors: errors, success: success});
}

exports.get_signup = function(req, res, next) {
  const errors = req.flash().error || [];
  res.render('user/signup', {errors: errors});
}

exports.post_login = passport.authenticate('local', {
  successRedirect: '/add-blog',
  failureRedirect: '/users/login',
  failureFlash: true
});

exports.post_signup = passport.authenticate('local-signup', {
	successRedirect: '/users/login',
	failureRedirect: '/users/signup',
	failureFlash: true
});
