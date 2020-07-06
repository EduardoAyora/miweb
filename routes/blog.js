var express = require('express');
var router = express.Router();
const blog = require('../controllers/blog');
const uploadImages = require('../uploadImages');

const auth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}

router.get('/', blog.get_blog);
// router.post('/add-blog', auth, uploadImages.upload.single('imageFile'), blog.post_add_blog);
router.get('/add-post', auth, blog.get_add_post);
router.post('/add-post', auth, blog.post_add_post, blog.saveArticleAndRedirect('add-post'));
router.get('/edit-blog', auth, blog.get_edit_blog);
router.get('/edit/:id', auth, blog.get_edit_post);
router.get('/:url', blog.get_blog_url);
router.put('/:id', auth, blog.put_post, blog.saveArticleAndRedirect('edit-blog'));
router.delete('/:id', auth, blog.delete_post);

module.exports = router;
