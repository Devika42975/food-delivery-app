import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaMapMarkerAlt, FaClock, FaTrash } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import RestaurantImage from '../components/RestaurantImage';
import './Favorites.css';

const Favorites = () => {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="favorites-header">
            <h1>My Favorites</h1>
            <p>Your favorite restaurants will appear here</p>
          </div>
          
          <div className="empty-favorites">
            <div className="empty-icon">
              <FaHeart />
            </div>
            <h2>No favorites yet</h2>
            <p>Start exploring restaurants and add them to your favorites by clicking the heart icon.</p>
            <Link to="/" className="btn btn-primary">
              Explore Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <div className="header-content">
            <h1>My Favorites</h1>
            <p>{favorites.length} restaurant{favorites.length !== 1 ? 's' : ''} in your favorites</p>
          </div>
          
          <div className="header-actions">
            <button 
              className="btn btn-outline clear-all-btn"
              onClick={clearFavorites}
            >
              <FaTrash /> Clear All
            </button>
          </div>
        </div>

        <div className="favorites-grid">
          {favorites.map((restaurant) => (
            <div key={restaurant._id} className="favorite-card">
              <Link to={`/restaurants/${restaurant._id}`} className="card-link">
                <div className="card-image">
                  <RestaurantImage restaurant={restaurant} className="card-image-img" />
                </div>
                
                <div className="card-content">
                  <div className="card-header">
                    <h3>{restaurant.name}</h3>
                    <div className="rating">
                      <FaStar className="star" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <div className="card-meta">
                    <span className="cuisine">
                      {Array.isArray(restaurant.cuisine) 
                        ? restaurant.cuisine.join(', ') 
                        : restaurant.cuisine || 'Multi-cuisine'}
                    </span>
                    <span className="price">{restaurant.priceRange}</span>
                  </div>
                  
                  <div className="card-footer">
                    <div className="added-date">
                      Added {new Date(restaurant.addedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
              
              <button 
                className="remove-favorite-btn"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(restaurant);
                }}
                title="Remove from favorites"
              >
                <FaHeart />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;