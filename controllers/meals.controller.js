//Models
// const { where } = require('sequelize/types');s
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//Functions
const createMeal = catchAsync(async (req,res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const meal = await Meal.create({ name, price, restaurantId: id });
  res.status(201).json({ status: 'done!', meal });
});

const getAllMeals = catchAsync(async (req,res, next) => {
  const meals = await Meal.findAll({
    where: { status: 'active' },
    include: [{ model: Restaurant }],
  });
  res.status(201).json({
    meals,
  });
});

const getMealById = catchAsync(async (req,res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: { status: 'active', id },
    include: [{ model: Restaurant }],
  });

  if (!meal) {
    return next(new AppError('MeaL Not Found', 400));
  }
  res.status(201).json({
    meal,
  });
});

const updateMeal = catchAsync(async (req,res, next) => {
  console.log("Meal")
  const { id } = req.params;
  const { name, price } = req.body;
  const meal = await Meal.findOne({ where: { status: 'active', id } });
  meal.update({ name, price });

  res.status(201).json({
    meal,
  });
});

const deleteMeal = catchAsync(async (req,res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({ where: { status: 'active', id } });
  meal.update({ status: 'deleted' });

  res.status(201).json({
    meal,
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
