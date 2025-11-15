const Order = require('../models/Order');

// Mock orders for development
let mockOrders = [];

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, restaurant, deliveryAddress, paymentMethod, notes } = req.body;
    
    // Calculate totals - DO NOT trust client-sent totals
    // Convert USD prices to INR (multiply by 75) and calculate subtotal
    const subtotal = items.reduce((sum, item) => {
      const priceInRupees = item.price * 75; // Convert USD to INR
      return sum + (priceInRupees * item.quantity);
    }, 0);
    
    const deliveryFee = 20; // ₹20 delivery fee
    const taxAmount = Math.round(subtotal * 0.05); // 5% GST, rounded
    const grandTotal = subtotal + deliveryFee + taxAmount;
    
    // Test case: item with price 75 INR, qty 1 should give subtotal=75, total=75+20+4=99
    
    const newOrder = {
      _id: 'order_' + Date.now(),
      items: items.map(item => ({
        ...item,
        priceInRupees: item.price * 75 // Correct conversion rate
      })),
      restaurant,
      totalAmount: subtotal,
      deliveryFee,
      taxAmount,
      grandTotal,
      status: 'pending',
      deliveryAddress,
      paymentMethod,
      notes,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
      statusHistory: [{
        status: 'pending',
        timestamp: new Date().toISOString(),
        message: 'Order placed successfully'
      }]
    };
    
    mockOrders.unshift(newOrder);
    
    // Simulate realistic order progression
    setTimeout(() => updateOrderStatus(newOrder._id, 'preparing', 'Restaurant is preparing your order'), 2 * 60 * 1000); // 2 minutes
    setTimeout(() => updateOrderStatus(newOrder._id, 'out_for_delivery', 'Your order is out for delivery'), 5 * 60 * 1000); // 5 minutes
    setTimeout(() => updateOrderStatus(newOrder._id, 'delivered', 'Order delivered successfully'), 15 * 60 * 1000); // 15 minutes
    
    res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: mockOrders.length,
      data: mockOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = mockOrders.find(o => o._id === req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to update order status
const updateOrderStatus = (orderId, status, message) => {
  const orderIndex = mockOrders.findIndex(o => o._id === orderId);
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = status;
    mockOrders[orderIndex].statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, message } = req.body;
    updateOrderStatus(req.params.id, status, message);
    
    const order = mockOrders.find(o => o._id === req.params.id);
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};