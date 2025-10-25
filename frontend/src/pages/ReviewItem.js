import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import ReviewForm from '../components/ReviewForm';
import './ReviewItem.css';

const ReviewItem = () => {
  const { orderId, itemId } = useParams();
  const { getOrder } = useOrder();
  const [order, setOrder] = useState(null);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderAndItem = () => {
      try {
        setLoading(true);
        
        // Get order from context
        const orderData = getOrder(orderId);
        
        if (!orderData) {
          navigate('/orders');
          return;
        }
        
        setOrder(orderData);
        
        // Find the specific item
        const foundItem = orderData.items.find(i => i._id === itemId);
        
        if (!foundItem) {
          navigate(`/orders/tracking/${orderId}`);
          return;
        }
        
        setItem(foundItem);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
        navigate('/orders');
      }
    };
    
    fetchOrderAndItem();
  }, [orderId, itemId, getOrder, navigate]);

  const handleReviewSubmitted = () => {
    // Navigate back to order tracking page
    navigate(`/orders/tracking/${orderId}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!order || !item) {
    return <div className="error">Item not found</div>;
  }

  return (
    <div className="review-item-page">
      <div className="container">
        <h1>Review Your Order</h1>
        
        <div className="order-info">
          <h2>Order from {order.restaurant.name}</h2>
          <p>Order ID: {order.id}</p>
        </div>
        
        <div className="item-to-review">
          <div className="item-details">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
          </div>
          
          {item.review ? (
            <div className="existing-review">
              <h3>Your Review</h3>
              <div className="review-rating">Rating: {item.review.rating}/5</div>
              <div className="review-comment">{item.review.comment}</div>
              <p className="review-date">
                Submitted on {new Date(item.review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <ReviewForm 
              orderId={orderId} 
              itemId={itemId} 
              onReviewSubmitted={handleReviewSubmitted} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;