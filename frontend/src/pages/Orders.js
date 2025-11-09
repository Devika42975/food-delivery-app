import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { FaStar, FaClock, FaMapMarkerAlt, FaMotorcycle, FaCheckCircle, FaUtensils } from 'react-icons/fa';
import './Orders.css';

const Orders = () => {
  const { orders } = useOrder();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState('all');

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'preparing':
        return <FaUtensils className="status-icon preparing" />;
      case 'out_for_delivery':
        return <FaMotorcycle className="status-icon delivery" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'pending': return 25;
      case 'preparing': return 50;
      case 'out_for_delivery': return 75;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <div className="auth-required">
          <h2>Please log in to view your orders</h2>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <div className="order-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'preparing' ? 'active' : ''}
            onClick={() => setFilter('preparing')}
          >
            Preparing
          </button>
          <button 
            className={filter === 'out_for_delivery' ? 'active' : ''}
            onClick={() => setFilter('out_for_delivery')}
          >
            On the Way
          </button>
          <button 
            className={filter === 'delivered' ? 'active' : ''}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-content">
            <h3>No orders found</h3>
            <p>
              {filter === 'all' 
                ? "You haven't placed any orders yet." 
                : `No ${filter.replace('_', ' ')} orders found.`
              }
            </p>
            <Link to="/" className="btn btn-primary">Browse Restaurants</Link>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div key={order._id || order.id} className="order-card">
              <div className="order-header">
                <div className="order-restaurant">
                  <h3>{order.restaurant.name}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="order-status-section">
                  <div className="status-badge">
                    {getStatusIcon(order.status)}
                    <span className="status-text">
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Order Tracking Progress Bar */}
              <div className="order-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${getStatusProgress(order.status)}%` }}
                  ></div>
                </div>
                <div className="progress-steps">
                  <div className={`step ${['pending', 'preparing', 'out_for_delivery', 'delivered'].includes(order.status) ? 'completed' : ''}`}>
                    <FaClock />
                    <span>Confirmed</span>
                  </div>
                  <div className={`step ${['preparing', 'out_for_delivery', 'delivered'].includes(order.status) ? 'completed' : ''}`}>
                    <FaUtensils />
                    <span>Preparing</span>
                  </div>
                  <div className={`step ${['out_for_delivery', 'delivered'].includes(order.status) ? 'completed' : ''}`}>
                    <FaMotorcycle />
                    <span>On the way</span>
                  </div>
                  <div className={`step ${order.status === 'delivered' ? 'completed' : ''}`}>
                    <FaCheckCircle />
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="item-name">{item.name}</span>
                    </div>
                    <div className="item-price">
                      ₹{item.priceInRupees ? (item.priceInRupees * item.quantity).toFixed(0) : (item.price * item.quantity * 15).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{order.totalAmount ? order.totalAmount.toFixed(0) : (order.items.reduce((sum, item) => sum + (item.priceInRupees * item.quantity), 0)).toFixed(0)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>{order.deliveryFee || 20}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>{order.taxAmount ? order.taxAmount.toFixed(0) : '0'}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{order.grandTotal ? order.grandTotal.toFixed(0) : order.total.toFixed(0)}</span>
                </div>
              </div>
              
              <div className="order-actions">
                <Link 
                  to={`/orders/tracking/${order.id || order._id}`} 
                  className="btn btn-secondary"
                >
                  <FaMapMarkerAlt /> Track Order
                </Link>
                <Link 
                  to={`/restaurants/${order.restaurant._id}`} 
                  className="btn btn-primary"
                >
                  Reorder
                </Link>
                {order.status === 'delivered' && (
                  <button className="btn btn-outline">
                    <FaStar /> Rate & Review
                  </button>
                )}
              </div>

              {/* Estimated Delivery Time */}
              {order.status !== 'delivered' && (
                <div className="delivery-estimate">
                  <FaClock />
                  <span>
                    Estimated delivery: {
                      order.status === 'pending' ? '40-50 min' :
                      order.status === 'preparing' ? '25-35 min' :
                      order.status === 'out_for_delivery' ? '10-15 min' : 'Soon'
                    }
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;