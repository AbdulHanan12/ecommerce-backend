// validators/userValidator.js
const { body, validationResult } = require('express-validator');

// Validation rules for updating a user
const validateUpdateUser = [
  body('username')
    .isString()
    .withMessage('Username must be a valid string.')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username should be between 3 to 30 characters long.'),
];


// Custom error handling middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
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
  validateUpdateUser,
  handleValidationErrors
};
