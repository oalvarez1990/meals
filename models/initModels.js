const { User } = require('./user.model');
const { Restaurant } = require('./restaurant.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Review } = require('./review.model');


const initModels = () => {

  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

 
  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant);

  
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  // 1 Meal <----> 1 Orders
  Meal.hasMany(Order, { foreignKey: 'mealId' });
  Order.belongsTo(Meal);

  // 1 User <----> M Order
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User);

};

module.exports = { initModels };
