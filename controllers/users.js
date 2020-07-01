var User = require('../models/user');
var passport = require('passport');

exports.get_login = function(req, res, next) {
  const errors = req.flash().error || [];
  res.render('user/login', {errors});
}

exports.get_signup = function(req, res, next) {
  const errors = req.flash().error || [];
  res.render('user/signup', {errors});
}

exports.post_signup = function(req, res, next) {
  User.create(req.body)
    .then((user) => {
        console.log('User Created ', user);
        res.redirect('/login');
    }, (err) => next(err))
    .catch((err) => next(err));
}
