var express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const updateUserValidation = require('../validations/updateUserValidation');
const updatePasswordValidation = require('../validations/updatePasswordValidation');

var router = express.Router();

const authRoutes = express.Router();

authRoutes.post('/signup', authController.signup);
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', auth, authController.logout);
authRoutes.get('/get-user', auth, authController.authUser); 
authRoutes.get('/all-user', auth, authController.allUser); 
authRoutes.patch('/update-user', auth, updateUserValidation.validateUpdateUser, updateUserValidation.handleValidationErrors, authController.updateUser); 
authRoutes.patch('/update-password', auth,updatePasswordValidation.validateUserPassword, updatePasswordValidation.handleValidationErrors ,  authController.updatePassword); 


router.use('/auth', authRoutes); // Prefix for user routes

module.exports = router;
