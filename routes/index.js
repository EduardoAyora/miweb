var express = require('express');
var router = express.Router();

const index = require('../controllers/index');

const auth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}

/* GET home page. */
router.get('/', index.get_index);
router.get('/blog', index.get_blog);
router.get('/add-blog', auth, index.get_add_blog);

module.exports = router;
