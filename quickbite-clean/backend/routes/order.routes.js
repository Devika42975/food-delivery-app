const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus
} = require('../controllers/order.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrder);

router.route('/:id/status')
  .put(protect, authorize('restaurant', 'admin'), updateOrderStatus);

module.exports = router;