var express = require('express');
var router = express.Router();

const index = require('../controllers/index');

/* GET home page. */
router.get('/', index.get_index);
router.get('/blog', index.get_blog);

module.exports = router;
