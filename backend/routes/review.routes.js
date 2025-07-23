const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// These routes will be implemented with their controllers
router.route('/')
  .post(protect, (req, res) => {
    res.status(200).json({ message: 'Create review - To be implemented' });
  });

router.route('/:id')
  .get((req, res) => {
    res.status(200).json({ message: 'Get review by ID - To be implemented' });
  })
  .put(protect, (req, res) => {
    res.status(200).json({ message: 'Update review - To be implemented' });
  })
  .delete(protect, (req, res) => {
    res.status(200).json({ message: 'Delete review - To be implemented' });
  });

router.route('/restaurant/:restaurantId')
  .get((req, res) => {
    res.status(200).json({ message: 'Get reviews by restaurant - To be implemented' });
  });

module.exports = router;