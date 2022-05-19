//Models
// const { where } = require('sequelize/types');s
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//Functions
const createOrder = catchAsync(async (req,res, next) => {
  const { sessionUser } = req;
  const { quantity, mealId } = req.body;
  //search Meal
  const meal = await Meal.findOne({ where: { id: mealId } });
  if (!meal) {
    return next(new AppError('Meal Not Found', 400));
  }
  const totalPrice = meal.price * quantity
  const order = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  res.status(201).json({ status: 'done!', order });
});

const getAllOrders = catchAsync(async (req, res, next) => {
    const {sessionUser} = req

  const orders = await Order.findAll({
    where: { status: 'active', userId: sessionUser.id },
    include: [{model: Meal, include: [{model: Restaurant}]}] ,
  });
  res.status(201).json({
    orders,
  });
});

const updateOrder = catchAsync(async (req,res, next) => {
  const { id } = req.params;
  const {sessionUser} = req

  const order = await Order.findOne({ where: {id, userId: sessionUser.id } });
  if(!order){
    return next(new AppError(`This order don´t exist`, 400));
  }
  if(order.status!=='active'){
    return next(new AppError(`This order have status: ${order.status}`, 400));
  } 

  order.update({ status: 'completed' });

  res.status(201).json({
    order,
  });
});

const deleteOrder = catchAsync(async (req,res, next) => {
    const { id } = req.params;
    const {sessionUser} = req
    const order = await Order.findOne({ where: { status: 'active', id, userId: sessionUser.id } });
    order.update({ status: 'cancelled' });
  
    res.status(201).json({
      order,
    });
});

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
