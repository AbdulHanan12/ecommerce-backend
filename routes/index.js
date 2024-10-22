var express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const authRoutes = express.Router();

authRoutes.post('/signup', authController.signup); // POST /auth/signup
authRoutes.post('/login', authController.login); // POST /auth/login
authRoutes.post('/logout', auth, authController.logout); // POST /auth/logout
authRoutes.get('/get-user', auth, authController.authUser); // GET /auth/login
authRoutes.get('/all-user', auth, authController.allUser); // GET /auth/login


router.use('/auth', authRoutes); // Prefix for user routes

module.exports = router;
