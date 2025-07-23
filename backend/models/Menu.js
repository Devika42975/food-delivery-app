const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  image: String,
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isVegan: {
    type: Boolean,
    default: false,
  },
  isGlutenFree: {
    type: Boolean,
    default: false,
  },
  spicyLevel: {
    type: Number,
    min: 0,
    max: 3,
    default: 0,
  },
  popular: {
    type: Boolean,
    default: false,
  },
});

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a menu name'],
      trim: true,
    },
    description: String,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    categories: [String],
    items: [menuItemSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Menu', menuSchema);