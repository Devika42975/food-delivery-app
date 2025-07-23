import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import RestaurantImage from '../components/RestaurantImage';
import MenuItemImage from '../components/MenuItemImage';
import { getRestaurantMenu } from '../utils/restaurantMenus';
import '../utils/imageStyles.css';
import { FaStar, FaRegStar, FaClock, FaPhone, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import ReviewForm from '../components/ReviewForm';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [reviews, setReviews] = useState([]);
  const { addToCart, cart } = useCart();

  // Mock restaurant data for when API fails
  const mockRestaurantData = {
    _id: id,
    name: id === 'rest1' ? 'Tiamo' : 
          id === 'rest2' ? 'Shri Sagar CTR' : 
          id === 'rest3' ? 'Kuuraku' : 
          id === 'rest4' ? 'Geist Brewing Co., OMR' : 
          id === 'rest5' ? 'Bang At The Ritz-Carlton' : 
          id === 'rest6' ? 'Bob\'s' : 
          id === 'rest7' ? 'Roxie' : 
          id === 'rest8' ? 'The 13th Floor' : 
          id === 'rest9' ? 'Toit' : 
          id === 'rest10' ? 'Hype' : 'Other Restaurant',
    cuisine: id === 'rest1' ? ['Italian', 'European'] : 
             id === 'rest2' ? ['South Indian', 'Vegetarian'] : 
             id === 'rest3' ? ['Japanese', 'Asian'] : 
             id === 'rest4' ? ['Brewery', 'Continental'] : 
             id === 'rest5' ? ['Fine Dining', 'Multi-cuisine'] : 
             id === 'rest6' ? ['American', 'Bar'] : 
             id === 'rest7' ? ['Continental', 'Bar'] : 
             id === 'rest8' ? ['Continental', 'Rooftop'] : 
             id === 'rest9' ? ['Brewery', 'Continental'] : 
             id === 'rest10' ? ['Bar', 'Multi-cuisine'] : ['International', 'Fusion'],
    priceRange: id === 'rest1' ? '₹₹₹' : 
               id === 'rest2' ? '₹' : 
               id === 'rest3' ? '₹₹' : 
               id === 'rest4' ? '₹₹₹' : 
               id === 'rest5' ? '₹₹₹₹' : '₹₹',
    rating: id === 'rest1' ? 4.6 : 
            id === 'rest2' ? 4.5 : 
            id === 'rest3' ? 4.4 : 
            id === 'rest4' ? 4.3 : 
            id === 'rest5' ? 4.8 : 
            id === 'rest6' ? 4.2 : 
            id === 'rest7' ? 4.1 : 
            id === 'rest8' ? 4.5 : 
            id === 'rest9' ? 4.4 : 
            id === 'rest10' ? 4.0 : 4.3,
    numReviews: id === 'rest1' ? 150 : 
                id === 'rest2' ? 200 : 
                id === 'rest3' ? 120 : 
                id === 'rest4' ? 180 : 
                id === 'rest5' ? 160 : 
                id === 'rest6' ? 110 : 
                id === 'rest7' ? 95 : 
                id === 'rest8' ? 140 : 
                id === 'rest9' ? 190 : 
                id === 'rest10' ? 85 : 100,
    images: [id === 'rest1' ? 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest2' ? 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest3' ? 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest4' ? 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest5' ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest6' ? 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest7' ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest8' ? 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest9' ? 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             id === 'rest10' ? 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
             'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    description: id === 'rest1' ? 'Authentic Italian cuisine with a modern twist in an elegant setting.' : 
                 id === 'rest2' ? 'Famous South Indian restaurant known for its crispy dosas and filter coffee.' : 
                 id === 'rest3' ? 'Authentic Japanese cuisine with a focus on yakitori and ramen.' : 
                 id === 'rest4' ? 'Craft brewery with a wide selection of beers and gourmet food.' : 
                 id === 'rest5' ? 'Luxurious dining experience with panoramic city views and international cuisine.' : 
                 id === 'rest6' ? 'Casual American bar and grill with a lively atmosphere.' : 
                 id === 'rest7' ? 'Trendy bar with creative cocktails and continental cuisine.' : 
                 id === 'rest8' ? 'Rooftop restaurant with stunning city views and fine dining.' : 
                 id === 'rest9' ? 'Popular craft brewery with a great selection of beers and pub food.' : 
                 id === 'rest10' ? 'Vibrant bar with DJ nights and a diverse food menu.' : 
                 'Exceptional dining experience with a focus on quality ingredients and innovative recipes.',
    address: id === 'rest1' ? {
      street: '15 Mount Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600002'
    } : id === 'rest2' ? {
      street: '77 Usman Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600017'
    } : id === 'rest3' ? {
      street: '126 Nungambakkam High Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600034'
    } : id === 'rest4' ? {
      street: '309 Pantheon Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600008'
    } : id === 'rest5' ? {
      street: '8-3-945/1, Ameerpet',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500073'
    } : id === 'rest6' ? {
      street: 'SD Road, Secunderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500003'
    } : {
      street: '123 Main Street',
      city: 'Anytown',
      state: 'Tamil Nadu',
      zipCode: '600001'
    },
    phone: '(555) 123-4567',
    hours: {
      monday: { open: '11:00 AM', close: '10:00 PM' },
      tuesday: { open: '11:00 AM', close: '10:00 PM' },
      wednesday: { open: '11:00 AM', close: '10:00 PM' },
      thursday: { open: '11:00 AM', close: '10:00 PM' },
      friday: { open: '11:00 AM', close: '11:00 PM' },
      saturday: { open: '11:00 AM', close: '11:00 PM' },
      sunday: { open: '12:00 PM', close: '9:00 PM' }
    },
    website: 'https://example.com',
    reviews: [
      {
        _id: 'review1',
        user: { name: 'John D.' },
        rating: 5,
        comment: 'Amazing food and great service!',
        createdAt: new Date().toISOString()
      },
      {
        _id: 'review2',
        user: { name: 'Sarah M.' },
        rating: 4,
        comment: 'Delicious food but slightly slow service.',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API first
        try {
          const response = await api.get(`/restaurants/${id}`);
          
          // If we got mock data flag or no data, fall back to mock data
          if (response.data.isMockData || !response.data.data) {
            console.log('Using mock data for restaurant details');
            setRestaurant(mockRestaurantData);
          } else {
            // Use real API data
            setRestaurant(response.data.data);
          }
        } catch (apiError) {
          // API call failed, use mock data
          console.warn('API call failed, using mock data:', apiError);
          setRestaurant(mockRestaurantData);
        }
        
        // Set first category as active if menus exist in mock data
        if (mockRestaurantData.menus && mockRestaurantData.menus.length > 0 && 
            mockRestaurantData.menus[0].categories && mockRestaurantData.menus[0].categories.length > 0) {
          setActiveCategory(mockRestaurantData.menus[0].categories[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error setting up restaurant data:', err);
        setError('Failed to load restaurant data. Please try again later.');
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleAddToCart = (item) => {
    if (cart.restaurant && cart.restaurant._id !== restaurant._id) {
      if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
    }
    
    addToCart(item, restaurant);
    toast.success(`${item.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    return stars;
  };

  if (loading) {
    return <div className="loading">Loading restaurant details...</div>;
  }

  if (error || !restaurant) {
    return <div className="error">{error || 'Restaurant not found'}</div>;
  }

  // Get restaurant-specific menu data
  const restaurantMenu = getRestaurantMenu(id);
  const menus = restaurant.menus && restaurant.menus.length > 0 
    ? restaurant.menus 
    : [restaurantMenu];

  // Set active category if not set
  if (!activeCategory && menus[0] && menus[0].categories && Array.isArray(menus[0].categories) && menus[0].categories.length > 0) {
    setActiveCategory(menus[0].categories[0]);
  }

  return (
    <div className="restaurant-details">
      <div className="restaurant-header">
        <div className="restaurant-cover">
          <RestaurantImage restaurant={restaurant} className="cover-image" />
        </div>
        
        <div className="container">
          <div className="restaurant-header-content">
            <h1>{restaurant.name}</h1>
            
            <div className="restaurant-meta">
              <div className="restaurant-cuisine">
                {restaurant.cuisine && Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(', ') : restaurant.cuisine || ''}
              </div>
              
              <div className="restaurant-rating">
                <div className="stars">{renderStars(restaurant.rating)}</div>
                <span className="rating-count">
                  {restaurant.rating.toFixed(1)} ({restaurant.numReviews} reviews)
                </span>
              </div>
              
              <div className="restaurant-price">{restaurant.priceRange}</div>
            </div>
            
            <div className="restaurant-info">
              <div className="info-item">
                <FaMapMarkerAlt />
                <span>
                  {restaurant.address && typeof restaurant.address === 'object' ? 
                    `${restaurant.address.street || ''}, ${restaurant.address.city || ''}, ${restaurant.address.state || ''}` : 
                    (typeof restaurant.address === 'string' ? restaurant.address : 'Address not available')}
                </span>
              </div>
              
              <div className="info-item">
                <FaClock />
                <span>
                  {restaurant.hours && restaurant.hours.monday && 
                   typeof restaurant.hours.monday === 'object' && 
                   restaurant.hours.monday.open && restaurant.hours.monday.close
                    ? `${restaurant.hours.monday.open} - ${restaurant.hours.monday.close}`
                    : '9:00 AM - 10:00 PM'}
                </span>
              </div>
              
              <div className="info-item">
                <FaPhone />
                <span>{restaurant.phone || '(555) 123-4567'}</span>
              </div>
              
              {restaurant.website && (
                <div className="info-item">
                  <FaGlobe />
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="restaurant-description">
          <h2>About {restaurant.name}</h2>
          <p>{restaurant.description || 'No description available.'}</p>
        </div>
        
        <div className="menu-section">
          <h2>Menu</h2>
          
          <div className="menu-categories">
            {menus[0] && menus[0].categories && Array.isArray(menus[0].categories) && menus[0].categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="menu-items">
            {menus[0] && menus[0].items && Array.isArray(menus[0].items) && menus[0].items
              .filter((item) => item.category === activeCategory)
              .map((item) => (
                <div key={item._id} className="menu-item">
                  <div className="menu-item-image">
                    <MenuItemImage item={item} />
                  </div>
                  
                  <div className="menu-item-content">
                    <div className="menu-item-header">
                      <h3>{item.name}</h3>
                      <span className="menu-item-price">₹{(item.price * 75).toFixed(0)}</span>
                    </div>
                    
                    <p className="menu-item-description">{item.description}</p>
                    
                    <div className="menu-item-tags">
                      {item.isVegetarian && <span className="tag vegetarian">Vegetarian</span>}
                      {item.isVegan && <span className="tag vegan">Vegan</span>}
                      {item.isGlutenFree && <span className="tag gluten-free">Gluten Free</span>}
                      {item.spicyLevel > 0 && (
                        <span className="tag spicy">
                          Spicy {Array(item.spicyLevel).fill('🌶️').join('')}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      className="btn add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          
          {restaurant.reviews && Array.isArray(restaurant.reviews) && restaurant.reviews.length > 0 ? (
            <div className="reviews-list">
              {restaurant.reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <h4>{review.user && review.user.name ? review.user.name : 'Anonymous'}</h4>
                      <div className="review-date">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                      </div>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
          
          <ReviewForm 
            restaurantId={restaurant._id} 
            onReviewSubmitted={(newReview) => {
              // Add the new review to the restaurant's reviews
              setRestaurant(prev => ({
                ...prev,
                reviews: [newReview, ...(prev.reviews || [])],
                rating: prev.reviews && prev.reviews.length > 0 
                  ? ((prev.rating * prev.reviews.length) + newReview.rating) / (prev.reviews.length + 1)
                  : newReview.rating,
                numReviews: prev.reviews ? prev.reviews.length + 1 : 1
              }));
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;