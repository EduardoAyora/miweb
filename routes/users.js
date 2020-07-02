var express = require('express');
var router = express.Router();
const user = require('../controllers/users');
var passport = require('passport');

/* GET users listing. */
router.get('/login', user.get_login);

router.post('/login', user.post_login);

router.get('/signup', user.get_signup);

router.post('/signup', user.post_signup);

router.get('/logout', function(req, res){
  req.logout();
  // exactamente como funcionan las sesiones
  if (req.session) {
    req.session.destroy();
  }
  res.redirect('/blog');
});

module.exports = router;
