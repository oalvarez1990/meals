//Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({ newRestaurant });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  // const { name, address, rating } = req.body;

  const restaurants = await Restaurant.findAll({ where: { status: 'active' } });

  res.status(201).json({ restaurants });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  res.status(201).json({ restaurant });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;

  const restaurant = await Restaurant.findOne({ where: { id } });

  restaurant.update({ name, address });

  res.status(201).json({ status: 'done!' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  restaurant.update({ status: 'deleted' });

  res.status(201).json({ status: 'done!' });
});

const createReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  const { comment, rating } = req.body;

  await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: id,
    rating,
  });

  res.status(201).json({ status: 'done!' });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;
  //Restaurant.id?
  const { sessionUser } = req;
  const { comment, rating } = req.body;

  const review = await Review.findOne({
    where: { id, userId: sessionUser.id },
  });
  review.update({ comment, rating });

  res.status(201).json({ status: 'done!' });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;
  //Restaurant.id?
  const { sessionUser } = req;

  const review = await Review.findOne({
    where: { id, userId: sessionUser.id },
  });
  review.update({ status: 'deleted' });

  res.status(201).json({ status: 'done!' });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
