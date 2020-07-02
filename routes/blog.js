var express = require('express');
var router = express.Router();
const user = require('../controllers/posts');

const auth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}

// router.get('/', index.get_index);

module.exports = router;
