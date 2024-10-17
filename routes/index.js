var express = require('express');
const authController = require('../controllers/authController');


var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const authRoutes = express.Router();

authRoutes.post('/signup', authController.signup); // POST /auth/signup
authRoutes.post('/login', authController.login); // POST /auth/login


router.use('/auth', authRoutes); // Prefix for user routes

module.exports = router;
