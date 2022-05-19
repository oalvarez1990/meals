const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  protectToken,
  protectAdmin
} = require('../middlewares/users.middlewares');


const {
  createRestaurantValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
   createRestaurant,
   getAllRestaurants,
   getRestaurantById,
   updateRestaurant,
   deleteRestaurant,
   createReview,
   updateReview,
   deleteReview
} = require('../controllers/restaurants.controller');

const router = express.Router();

// /root
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Apply protectToken middleware
router.use(protectToken);

//:id
router
  .route('/:id')
  .get(getRestaurantById)
  .patch(protectAdmin, updateRestaurant)
  .delete(protectAdmin, deleteRestaurant)

//root
router.post('/', 
createRestaurantValidations,
checkValidations, 
 createRestaurant);

// /reviews/:id 
router.post('/reviews/:id', createReview)

// /reviews/:restaurantId/:id
router
  .route('/reviews/:restaurantId/:id')
  .patch(protectAdmin,updateReview)
  .delete(protectAdmin,deleteReview)

module.exports = { restaurantsRouter: router };
