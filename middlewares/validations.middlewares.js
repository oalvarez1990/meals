const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRestaurantValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address')
    .isString()
    .withMessage('Adress must be string')
    .notEmpty()
    .withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isInt({min:1, max:5})
    .withMessage('Rating must be 1 to 5')
];

const createOrderValidations = [
  body('mealId')
    .notEmpty()
    .withMessage('mealId cannot be empty')
    .isInt()
    .withMessage('mealId must be Int'),  
  body('quantity')
    .notEmpty()
    .withMessage('quantity cannot be empty')
    .isInt()
    .withMessage('quantity must be Int'),
];

const createMealValidations = [
  body('name')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('name must be string'),
  body('price')
    .notEmpty()
    .withMessage('price cannot be empty')
    .isInt()
    .withMessage('price must be Int')
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

module.exports = {
  createUserValidations,
  createRestaurantValidations,
  createOrderValidations,
  createMealValidations,
  checkValidations,
};
