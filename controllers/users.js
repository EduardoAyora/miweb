var User = require('../models/user');
var passport = require('passport');

exports.get_login = function(req, res, next) {
  res.render('user/login');
}

exports.get_signup = function(req, res, next) {
  res.render('user/signup', {
    message: req.flash('signupMessage')
  });
}

exports.post_signup = passport.authenticate('local-signup', {
	successRedirect: 'signup',
	failureRedirect: 'signup',
	failureFlash: true // permitir flash messages
});

exports.post_login = passport.authenticate('local-login', {
	successRedirect: '/blog',
	failureRedirect: 'login',
	failureFlash: true // permitir flash messages
});

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
