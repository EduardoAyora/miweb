var express = require('express');
var router = express.Router();
const blog = require('../controllers/blog');

const auth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}

router.get('/', blog.get_blog);
router.get('/add-blog', auth, blog.get_add_blog);
router.post('/add-blog', auth, blog.upload.single('imageFile'), blog.post_add_blog);
router.get('/:url', blog.get_blog_url);

module.exports = router;
