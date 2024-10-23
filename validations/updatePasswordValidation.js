// validators/updatePasswordValidaton.js
const { body, validationResult } = require('express-validator');

// Validation rules for updating a user password
const validateUserPassword = [
    body('old_password')
        .notEmpty()
        .withMessage('Password is required'),
    body('password')
        .isString()
        .withMessage('Password must be a string.')
        .isLength({ min: 3})
        .withMessage('Password should be 3 characters long.'),

    body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];


// Custom error handling middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(error => ({
          field: error.param,
          message: error.msg,
        })),
      });
    }
    next();
  };

module.exports = {
    validateUserPassword,
  handleValidationErrors
};
