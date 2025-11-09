import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { formatPriceInRupees } from '../utils/currencyUtils';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cash',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  // Redirect if cart is empty
  if (!cart.items.length) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Place order using OrderContext
      const orderId = placeOrder(
        cart.items,
        cart.restaurant,
        grandTotal,
        formData
      );
      
      // Clear cart after successful order
      clearCart();
      
      // Show success message
      toast.success('Order placed successfully!');
      
      // Redirect to order tracking page
      navigate(`/orders/tracking/${orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Convert dollar prices to rupees
  const totalInRupees = total * 15;
  const deliveryFee = 20; // Delivery fee in rupees
  const taxInRupees = totalInRupees * 0.05; // 5% GST
  const grandTotal = totalInRupees + deliveryFee + taxInRupees;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="restaurant-info">
              <h3>{cart.restaurant.name}</h3>
              <p>
                {typeof cart.restaurant.address === 'object' 
                  ? `${cart.restaurant.address.street || ''}, ${cart.restaurant.address.city || ''}, ${cart.restaurant.address.state || ''}` 
                  : (typeof cart.restaurant.address === 'string' ? cart.restaurant.address : 'Address not available')}
              </p>
            </div>
            
            <div className="cart-items">
              {cart.items.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="item-info">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">{formatPriceInRupees(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="price-details">
              <div className="price-row">
                <span>Subtotal</span>
                <span>{totalInRupees.toFixed(0)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee}</span>
              </div>
              <div className="price-row">
                <span>GST (5%)</span>
                <span>{taxInRupees.toFixed(0)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>{grandTotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
          
          <div className="delivery-details">
            <h2>Delivery Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="notes">Special Instructions</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions for delivery or food preparation"
                />
              </div>
              
              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-block place-order-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Place Order - ${grandTotal.toFixed(0)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;