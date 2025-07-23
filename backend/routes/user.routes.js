const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// These routes will be implemented with their controllers
router.route('/')
  .get(protect, authorize('admin'), (req, res) => {
    res.status(200).json({ message: 'Get all users - To be implemented' });
  });

router.route('/:id')
  .get(protect, (req, res) => {
    res.status(200).json({ message: 'Get user by ID - To be implemented' });
  })
  .put(protect, (req, res) => {
    res.status(200).json({ message: 'Update user - To be implemented' });
  })
  .delete(protect, authorize('admin'), (req, res) => {
    res.status(200).json({ message: 'Delete user - To be implemented' });
  });

module.exports = router;