const express = require('express');
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurant.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getRestaurants)
  .post(protect, authorize('restaurant', 'admin'), createRestaurant);

router.route('/:id')
  .get(getRestaurant)
  .put(protect, authorize('restaurant', 'admin'), updateRestaurant)
  .delete(protect, authorize('restaurant', 'admin'), deleteRestaurant);

module.exports = router;