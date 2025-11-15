import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useOrder } from '../context/OrderContext';
import './Review.css';

const Review = () => {
  const { orderId, restaurantId } = useParams();
  const navigate = useNavigate();
  const { getOrder } = useOrder();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const order = getOrder(orderId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      toast.error('Please enter a comment');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store review in localStorage for demo
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const newReview = {
        _id: `review-${Date.now()}`,
        orderId,
        restaurantId,
        rating,
        comment,
        createdAt: new Date().toISOString(),
        user: { name: 'You' }
      };
      
      reviews.push(newReview);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      
      toast.success('Review submitted successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <div className="review-page">
        <div className="container">
          <h1>Order not found</h1>
          <p>The order you're trying to review could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-page">
      <div className="container">
        <h1>Rate & Review</h1>
        
        <div className="order-info">
          <h2>{order.restaurant.name}</h2>
          <p>Order ID: {order.id || order._id}</p>
          <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="review-form">
          <form onSubmit={handleSubmit}>
            <div className="rating-section">
              <h3>How was your experience?</h3>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        size={32}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
              <span className="rating-text">
                {rating ? `You rated: ${rating} star${rating !== 1 ? 's' : ''}` : 'Select a rating'}
              </span>
            </div>
            
            <div className="comment-section">
              <h3>Tell us about your experience</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this restaurant..."
                rows={6}
                required
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/orders')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;