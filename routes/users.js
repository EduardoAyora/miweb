var express = require('express');
var router = express.Router();
const user = require('../controllers/users');

/* GET users listing. */
router.get('/login', user.get_login);

router.get('/signup', user.get_signup);

router.post('/signup', user.post_signup);

router.post('/login', user.post_login);

module.exports = router;
