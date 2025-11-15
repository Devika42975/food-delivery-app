const User = require('../models/User');

// @desc    Add restaurant to favorites
// @route   POST /api/users/me/favorites/:restaurantId
// @access  Private
exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.favorites.includes(req.params.restaurantId)) {
      user.favorites.push(req.params.restaurantId);
      await user.save();
    }
    
    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove restaurant from favorites
// @route   DELETE /api/users/me/favorites/:restaurantId
// @access  Private
exports.removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.favorites = user.favorites.filter(
      fav => fav.toString() !== req.params.restaurantId
    );
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user favorites
// @route   GET /api/users/me/favorites
// @access  Private
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    
    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};