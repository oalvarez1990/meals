const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  protectToken,
  protectAccountOwner,
  userExists,
  userExistsMod,
} = require('../middlewares/users.middlewares');

const {
  createOrderValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders.controller');

const router = express.Router();

// Apply protectToken middleware
router.use(protectToken);

// /root
router.post('/', createOrderValidations, checkValidations, createOrder);

// /me
router.get('/me', getAllOrders);

//:id
router
  .route('/:id')
  .patch(userExistsMod,protectAccountOwner, updateOrder)
  .delete(userExistsMod,protectAccountOwner, deleteOrder);

module.exports = { ordersRouter: router };
