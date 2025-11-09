import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  // Convert dollar prices to rupees
  const totalInRupees = total * 15;
  const deliveryFee = cart.items.length > 0 ? 20 : 0; // Delivery fee in rupees
  const taxInRupees = totalInRupees * 0.05; // 5% GST
  const grandTotal = totalInRupees + deliveryFee + taxInRupees;

  return (
    <div className={`cart-container ${isOpen ? 'open' : ''}`}>
      <button className="cart-toggle" onClick={toggleCart}>
        <FaShoppingCart />
        {cart.items.length > 0 && (
          <span className="cart-count">
            {cart.items.reduce((count, item) => count + item.quantity, 0)}
          </span>
        )}
      </button>

      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={toggleCart}>×</button>
        </div>

        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <small>Add items from a restaurant to get started</small>
          </div>
        ) : (
          <>
            <div className="cart-restaurant">
              <h3>{cart.restaurant.name}</h3>
            </div>

            <div className="cart-items">
              {cart.items.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <div className="item-price">₹{(item.price * 15).toFixed(0)}</div>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{totalInRupees.toFixed(0)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee}</span>
              </div>
              <div className="summary-row">
                <span>GST (5%)</span>
                <span>{taxInRupees.toFixed(0)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{grandTotal.toFixed(0)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <Link to="/checkout" className="checkout-btn" onClick={toggleCart}>
                Proceed to Checkout
              </Link>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>

      {isOpen && <div className="cart-overlay" onClick={toggleCart}></div>}
    </div>
  );
};

export default Cart;