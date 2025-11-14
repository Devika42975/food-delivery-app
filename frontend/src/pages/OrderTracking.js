import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { formatPriceInRupees } from '../utils/currencyUtils';
import { FaCheckCircle, FaHourglass, FaMotorcycle, FaUtensils } from 'react-icons/fa';
import './OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const { getOrder, updateOrderStatus } = useOrder();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(0);
  
  // Dynamic order statuses based on actual order data
  const getOrderStatuses = (order) => {
    const statuses = [
      { id: 0, name: 'Order Received', icon: <FaCheckCircle />, status: 'pending' },
      { id: 1, name: 'Preparing Food', icon: <FaUtensils />, status: 'preparing' },
      { id: 2, name: 'Out for Delivery', icon: <FaMotorcycle />, status: 'out_for_delivery' },
      { id: 3, name: 'Delivered', icon: <FaCheckCircle />, status: 'delivered' }
    ];
    
    return statuses.map(status => {
      const statusUpdate = order?.statusUpdates?.find(s => s.status === status.status);
      return {
        ...status,
        time: statusUpdate ? 
          new Date(statusUpdate.timestamp).toLocaleString() : 
          status.status === 'pending' ? 'Order placed' :
          status.status === 'preparing' ? 'Waiting...' :
          status.status === 'out_for_delivery' ? 'Pending...' :
          'Pending...',
        message: statusUpdate?.message || ''
      };
    });
  };

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
  const subtotalInRupees = subtotal * 15;
  const deliveryFee = 20; // Delivery fee in rupees
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
              {getOrderStatuses(order).map((status, index) => (
                <div 
                  key={status.id} 
                  className={`status-step ${index <= currentStatus ? 'active' : ''}`}
                >
                  <div className="status-icon">{status.icon}</div>
                  <div className="status-info">
                    <div className="status-name">{status.name}</div>
                    <div className="status-time">{status.time}</div>
                    {status.message && <div className="status-message">{status.message}</div>}
                  </div>
                  {index < getOrderStatuses(order).length - 1 && (
                    <div className={`status-line ${index < currentStatus ? 'active' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="estimated-delivery">
              <h3>Estimated Delivery Time</h3>
              <div className="delivery-time">
                {order.estimatedDelivery ? 
                  new Date(order.estimatedDelivery).toLocaleString() :
                  order.status === 'delivered' ? 'Delivered' :
                  order.status === 'out_for_delivery' ? '10-15 minutes' :
                  order.status === 'preparing' ? '25-35 minutes' :
                  '40-50 minutes'
                }
              </div>
              {order.status !== 'delivered' && (
                <div className="delivery-note">
                  <small>Delivery times may vary based on traffic and weather conditions</small>
                </div>
              )}
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
                  <span className="item-price">{formatPriceInRupees(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="price-details">
              <div className="price-row">
                <span>Subtotal</span>
                <span>{(order.subtotal || subtotalInRupees).toFixed(0)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee</span>
                <span>{order.deliveryFee || deliveryFee}</span>
              </div>
              <div className="price-row">
                <span>GST (5%)</span>
                <span>{(order.tax || taxInRupees).toFixed(0)}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>{(order.total || totalInRupees).toFixed(0)}</span>
              </div>
            </div>
            
            <div className="delivery-address">
              <h3>Delivery Address</h3>
              {order.deliveryAddress ? (
                typeof order.deliveryAddress === 'object' ? (
                  <>
                    <p>{order.deliveryAddress.name}</p>
                    <p>{order.deliveryAddress.address}</p>
                    <p>Phone: {order.deliveryAddress.phone}</p>
                  </>
                ) : (
                  <p>{order.deliveryAddress}</p>
                )
              ) : (
                <p>Address not available</p>
              )}
            </div>
            
            <div className="order-info">
              <h3>Order Information</h3>
              <div className="info-row">
                <span>Order ID:</span>
                <span>{order._id}</span>
              </div>
              <div className="info-row">
                <span>Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span>Payment Method:</span>
                <span>{order.paymentMethod || 'Cash on Delivery'}</span>
              </div>
            </div>
            
            <div className="order-actions">
              <Link to="/orders" className="btn btn-secondary">View All Orders</Link>
              {currentStatus === 3 && (
                <Link 
                  to={`/review/${orderId}/${order.restaurant._id}`} 
                  className="btn btn-primary"
                >
                  Rate & Review Restaurant
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;