import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import RestaurantImage from './RestaurantImage';
import '../utils/imageStyles.css';

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="restaurant-list-container">
      {restaurants.map((restaurant) => (
        <Link
          to={`/restaurants/${restaurant._id}`}
          className="restaurant-list-item"
          key={restaurant._id}
        >
          <div className="restaurant-list-image">
            <RestaurantImage restaurant={restaurant} />
          </div>
          <div className="restaurant-list-info">
            <h3>{restaurant.name}</h3>
            <div className="restaurant-list-meta">
              <span className="cuisine">{restaurant.cuisine.join(', ')}</span>
              <span className="price">{restaurant.priceRange}</span>
            </div>
            <div className="restaurant-list-rating">
              <FaStar className="star-icon" />
              <span>{restaurant.rating.toFixed(1)}</span>
              <span className="review-count">({restaurant.numReviews} reviews)</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;