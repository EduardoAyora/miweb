var express = require('express');
var router = express.Router();
const user = require('../controllers/users');
var passport = require('passport');

/* GET users listing. */
router.get('/login', user.get_login);

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/blog',
    failureRedirect: '/users/login',
    failureFlash: true
  })
);

router.get('/signup', user.get_signup);

router.post('/signup', user.post_signup);

module.exports = router;
