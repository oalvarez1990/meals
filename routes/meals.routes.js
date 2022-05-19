const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

const {
  createMealValidations, checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controller');

const router = express.Router();

// /root
router.post('/:id', createMealValidations,checkValidations, createMeal);
router.get('/', getAllMeals);
router.get('/:id', getMealById);


// Apply protectToken middleware
router.use(protectToken);

//:id
router
  .route('/:id')
  .patch(protectAccountOwner, updateMeal)
  .delete(protectAccountOwner, deleteMeal);

module.exports = { mealsRouter: router };
