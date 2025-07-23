import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useOrder } from '../context/OrderContext';
import './ReviewForm.css';

const ReviewForm = ({ orderId, itemId, onReviewSubmitted }) => {
  const { addReview } = useOrder();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

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
      
      // Add review using OrderContext
      addReview(orderId, itemId, rating, comment);
      
      // Create a review object for the callback
      const newReview = {
        _id: `review-${Date.now()}`,
        user: { name: 'You' },
        rating,
        comment,
        createdAt: new Date().toISOString()
      };
      
      // Call the callback with the new review
      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }
      
      // Reset form
      setRating(0);
      setComment('');
      
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
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
                    size={24}
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
        
        <div className="form-group">
          <label htmlFor="comment">Your Review</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this restaurant..."
            rows={4}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-review-btn"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;