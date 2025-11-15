import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaFilter, FaList, FaTh, FaHeart, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../utils/api';
import RestaurantImage from '../components/RestaurantImage';
import { useFavorites } from '../context/FavoritesContext';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    priceRange: '',
    rating: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const { isFavorite, toggleFavorite } = useFavorites();

  // Enhanced location mapping for restaurants
  const getLocationForRestaurant = (restaurantId, name) => {
    const locations = [
      'Koramangala', 'Indiranagar', 'Whitefield', 'Malleshwaram', 'UB City', 'OMR',
      'HSR Layout', 'BTM Layout', 'Jayanagar', 'Rajajinagar', 'Marathahalli',
      'Electronic City', 'Banashankari', 'JP Nagar', 'Yelahanka', 'Hebbal'
    ];
    const hash = restaurantId.charCodeAt(restaurantId.length - 1) || 0;
    return locations[hash % locations.length];
  };

  // Enhanced delivery time calculation
  const getDeliveryTime = (priceRange, location) => {
    const baseTimes = {
      '$': ['15-25 min', '20-30 min'],
      '$$': ['20-30 min', '25-35 min'],
      '$$$': ['25-35 min', '30-40 min'],
      '$$$$': ['30-40 min', '35-45 min']
    };
    const times = baseTimes[priceRange] || baseTimes['$$'];
    return times[Math.random() > 0.5 ? 1 : 0];
  };

  // Convert price range from $ to readable labels
  const convertPriceRange = (priceRange) => {
    const conversion = {
      '$': 'Affordable',
      '$$': 'Mid-range',
      '$$$': 'Premium',
      '$$$$': 'Luxury'
    };
    return conversion[priceRange] || 'Mid-range';
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await api.get('/restaurants?limit=50');
        
        if (response.data.success && response.data.data) {
          // Enhance restaurant data with additional fields
          const enhancedRestaurants = response.data.data.map(restaurant => {
            const location = getLocationForRestaurant(restaurant._id, restaurant.name);
            const priceRange = convertPriceRange(restaurant.priceRange);
            const deliveryTime = getDeliveryTime(restaurant.priceRange, location);
            const isTopPick = restaurant.rating >= 4.5 && restaurant.numReviews >= 100;
            
            return {
              ...restaurant,
              location,
              deliveryTime,
              isTopPick,
              priceRange,
              image: restaurant.images && restaurant.images[0] ? restaurant.images[0] : 
                     `https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80`
            };
          });
          
          setRestaurants(enhancedRestaurants);
        } else {
          console.warn('No restaurant data received from API');
          setRestaurants([]);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Filter and sort restaurants
  const filteredAndSortedRestaurants = restaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (restaurant.cuisine && restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCuisine = !filters.cuisine || (restaurant.cuisine && restaurant.cuisine.includes(filters.cuisine));
      const matchesPrice = !filters.priceRange || restaurant.priceRange === filters.priceRange;
      const matchesRating = !filters.rating || restaurant.rating >= parseFloat(filters.rating);
      const matchesLocation = !filters.location || (restaurant.location && restaurant.location.toLowerCase().includes(filters.location.toLowerCase()));

      return matchesSearch && matchesCuisine && matchesPrice && matchesRating && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'delivery':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'cost':
          const priceOrder = { 'Affordable': 1, 'Mid-range': 2, 'Premium': 3, 'Luxury': 4 };
          return priceOrder[a.priceRange] - priceOrder[b.priceRange];
        case 'relevance':
        default:
          return (b.rating * 0.4 + b.numReviews * 0.0001 + (b.isTopPick ? 1 : 0) * 0.6) - 
                 (a.rating * 0.4 + a.numReviews * 0.0001 + (a.isTopPick ? 1 : 0) * 0.6);
      }
    });

  const topPickRestaurants = restaurants.filter(r => r.isTopPick);



  // Dynamic filter options based on available restaurants
  const cuisines = [...new Set(restaurants.flatMap(r => r.cuisine || []))].sort();
  const priceRanges = ['Affordable', 'Mid-range', 'Premium', 'Luxury'];
  const locations = [...new Set(restaurants.map(r => r.location).filter(Boolean))].sort();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Finding the best restaurants for you...</p>
      </div>
    );
  }

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="brand-name">QuickBite</span>
              <span className="tagline">Discover great food & restaurants</span>
            </h1>
            <p>Order from your favorite restaurants and get it delivered fast</p>
          </div>
          
          <div className="search-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="search-controls">
              <button 
                className={`filter-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filters
              </button>
              
              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FaTh />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FaList />
                </button>
              </div>
              
              <button 
                className="dark-mode-btn"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Cuisine</label>
                <select 
                  value={filters.cuisine} 
                  onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                >
                  <option value="">All Cuisines</option>
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Price Range</label>
                <select 
                  value={filters.priceRange} 
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                >
                  <option value="">All Prices</option>
                  {priceRanges.map(price => (
                    <option key={price} value={price}>{price}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Rating</label>
                <select 
                  value={filters.rating} 
                  onChange={(e) => setFilters({...filters, rating: e.target.value})}
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Location</label>
                <select 
                  value={filters.location} 
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <button 
                className="reset-filters-btn"
                onClick={() => setFilters({cuisine: '', priceRange: '', rating: '', location: ''})}
              >
                Reset All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Top Picks Carousel */}
      <section className="top-picks-section">
        <h2>🔥 Top Picks for You</h2>
        <div className="top-picks-carousel">
          {topPickRestaurants.map(restaurant => (
            <Link 
              key={restaurant._id} 
              to={`/restaurants/${restaurant._id}`} 
              className="top-pick-card"
            >
              <div className="pick-image">
                <RestaurantImage restaurant={restaurant} className="pick-image-img" />
                <div className="pick-badge">Top Pick</div>
              </div>
              <div className="pick-info">
                <h3>{restaurant.name}</h3>
                <div className="pick-meta">
                  <span className="rating">
                    <FaStar /> {restaurant.rating}
                  </span>
                  <span className="delivery-time">
                    <FaClock /> {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Restaurants List */}
      <section className="restaurants-section">
        <div className="section-header">
          <h2>All Restaurants ({filteredAndSortedRestaurants.length})</h2>
          <div className="sort-options">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Rating: High to Low</option>
              <option value="delivery">Delivery Time</option>
              <option value="cost">Cost: Low to High</option>
            </select>
          </div>
        </div>

        {filteredAndSortedRestaurants.length === 0 ? (
          <div className="no-results">
            <h3>No restaurants found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className={`restaurants-grid ${viewMode}`}>
            {filteredAndSortedRestaurants.map(restaurant => (
              <div key={restaurant._id} className="restaurant-card">
                <Link to={`/restaurants/${restaurant._id}`} className="card-link">
                  <div className="card-image">
                    <RestaurantImage restaurant={restaurant} className="card-image-img" />
                    <button 
                      className={`favorite-btn ${isFavorite(restaurant._id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(restaurant);
                      }}
                    >
                      <FaHeart />
                    </button>
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
                      <span className="cuisine">{restaurant.cuisine && Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(', ') : restaurant.cuisine || 'Multi-cuisine'}</span>
                      <span className="price">{restaurant.priceRange}</span>
                    </div>
                    
                    <div className="card-footer">
                      <div className="location">
                        <FaMapMarkerAlt />
                        <span>{restaurant.location}</span>
                      </div>
                      <div className="delivery-info">
                        <FaClock />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="reviews-count">
                      {restaurant.numReviews} reviews
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;