import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { FaCheckCircle, FaHourglass, FaMotorcycle, FaUtensils } from 'react-icons/fa';
import './OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const { getOrder, updateOrderStatus } = useOrder();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(0);
  
  // Mock order statuses
  const orderStatuses = [
    { id: 0, name: 'Order Received', icon: <FaCheckCircle />, time: '5 minutes ago' },
    { id: 1, name: 'Preparing Food', icon: <FaUtensils />, time: 'In progress' },
    { id: 2, name: 'Out for Delivery', icon: <FaMotorcycle />, time: 'Coming soon' },
    { id: 3, name: 'Delivered', icon: <FaCheckCircle />, time: 'Estimated in 25 minutes' }
  ];

  useEffect(() => {
    // Get order from context
    const fetchOrder = async () => {
      try {
        setLoading(true);
        
        // Get order from context
        const orderData = getOrder(orderId);
        
        if (orderData) {
          setOrder(orderData);
          
          // Set current status based on order status
          switch(orderData.status) {
            case 'placed':
              setCurrentStatus(0);
              // Simulate order progress for demo
              setTimeout(() => {
                updateOrderStatus(orderId, 'preparing', 'Restaurant is preparing your food');
                setCurrentStatus(1);
              }, 5000);
              setTimeout(() => {
                updateOrderStatus(orderId, 'out-for-delivery', 'Your order is on the way');
                setCurrentStatus(2);
              }, 10000);
              break;
            case 'preparing':
              setCurrentStatus(1);
              break;
            case 'out-for-delivery':
              setCurrentStatus(2);
              break;
            case 'delivered':
              setCurrentStatus(3);
              break;
            default:
              setCurrentStatus(0);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId, getOrder, updateOrderStatus]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  // Get order total from order data
  const total = order.total || 0;
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // Convert dollar prices to rupees
  const subtotalInRupees = subtotal * 75;
  const deliveryFee = 40; // Delivery fee in rupees
  const taxInRupees = subtotalInRupees * 0.05; // 5% GST
  const totalInRupees = subtotalInRupees + deliveryFee + taxInRupees;

  return (
    <div className="order-tracking-page">
      <div className="container">
        <div className="order-header">
          <h1>Order Tracking</h1>
          <div className="order-id">Order ID: {order._id}</div>
        </div>
        
        <div className="tracking-content">
          <div className="tracking-status">
            <h2>Order Status</h2>
            
            <div className="status-timeline">
              {orderStatuses.map((status, index) => (
                <div 
                  key={status.id} 
                  className={`status-step ${index <= currentStatus ? 'active' : ''}`}
                >
                  <div className="status-icon">{status.icon}</div>
                  <div className="status-info">
                    <div className="status-name">{status.name}</div>
                    <div className="status-time">{status.time}</div>
                  </div>
                  {index < orderStatuses.length - 1 && (
                    <div className={`status-line ${index < currentStatus ? 'active' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="estimated-delivery">
              <h3>Estimated Delivery Time</h3>
              <div className="delivery-time">25-35 minutes</div>
            </div>
          </div>
          
          <div className="order-details">
            <h2>Order Details</h2>
            
            <div className="restaurant-info">
              <h3>{order.restaurant.name}</h3>
              <p>
                {typeof order.restaurant.address === 'object' 
                  ? `${order.restaurant.address.street || ''}, ${order.restaurant.address.city || ''}, ${order.restaurant.address.state || ''}` 
                  : (typeof order.restaurant.address === 'string' ? order.restaurant.address : 'Address not available')}
              </p>
              <p>Phone: {order.restaurant.phone || 'Not available'}</p>
            </div>
            
            <div className="order-items">
              <h3>Items</h3>
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">₹{(item.price * item.quantity * 75).toFixed(0)}</span>
                </div>
              ))}
            </div>
            
            <div className="price-details">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotalInRupees.toFixed(0)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="price-row">
                <span>GST (5%)</span>
                <span>₹{taxInRupees.toFixed(0)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>₹{totalInRupees.toFixed(0)}</span>
              </div>
            </div>
            
            <div className="delivery-address">
              <h3>Delivery Address</h3>
              <p>{order.deliveryAddress?.name}</p>
              <p>{order.deliveryAddress?.address}</p>
              <p>Phone: {order.deliveryAddress?.phone}</p>
            </div>
            
            <div className="order-actions">
              <Link to="/orders" className="btn btn-secondary">View All Orders</Link>
              {currentStatus === 3 && order.items.map(item => (
                <Link 
                  key={item._id} 
                  to={`/review/${orderId}/${item._id}`} 
                  className="btn btn-primary"
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                >
                  Review {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;