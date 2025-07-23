const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// These routes will be implemented with their controllers
router.route('/')
  .get((req, res) => {
    res.status(200).json({ message: 'Get all menus - To be implemented' });
  })
  .post(protect, authorize('restaurant', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Create menu - To be implemented' });
  });

router.route('/:id')
  .get((req, res) => {
    res.status(200).json({ message: 'Get menu by ID - To be implemented' });
  })
  .put(protect, authorize('restaurant', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Update menu - To be implemented' });
  })
  .delete(protect, authorize('restaurant', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Delete menu - To be implemented' });
  });

router.route('/:id/items')
  .post(protect, authorize('restaurant', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Add menu item - To be implemented' });
  });

router.route('/:id/items/:itemId')
  .put(protect, authorize('restaurant', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Update menu item - To be implemented' });
  })
  .delete(protect, authorize('restaurant', 'admin'), (req, res) => {
    res.status(200).json({ message: 'Delete menu item - To be implemented' });
  });

module.exports = router;