import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaStar, FaFilter, FaList, FaTh } from 'react-icons/fa';
import RestaurantList from '../components/RestaurantList';
import RestaurantImage from '../components/RestaurantImage';
// import { convertPriceRanges } from '../utils/priceRangeConverter';
import '../components/RestaurantList.css';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    priceRange: '',
    rating: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Restaurant data for the application
  const mockRestaurants = [
    {
      _id: 'rest1',
      name: 'Tiamo',
      cuisine: ['Italian', 'European'],
      priceRange: '₹₹₹',
      rating: 4.6,
      numReviews: 150,
      images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest2',
      name: 'Shri Sagar CTR',
      cuisine: ['South Indian', 'Vegetarian'],
      priceRange: '₹',
      rating: 4.5,
      numReviews: 200,
      images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest3',
      name: 'Kuuraku',
      cuisine: ['Japanese', 'Asian'],
      priceRange: '₹₹',
      rating: 4.4,
      numReviews: 120,
      images: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest4',
      name: 'Geist Brewing Co., OMR',
      cuisine: ['Brewery', 'Continental'],
      priceRange: '₹₹₹',
      rating: 4.3,
      numReviews: 180,
      images: ['https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest5',
      name: 'Bang At The Ritz-Carlton',
      cuisine: ['Fine Dining', 'Multi-cuisine'],
      priceRange: '₹₹₹₹',
      rating: 4.8,
      numReviews: 160,
      images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest6',
      name: 'Bob\'s',
      cuisine: ['American', 'Bar'],
      priceRange: '₹₹',
      rating: 4.2,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest7',
      name: 'Roxie',
      cuisine: ['Continental', 'Bar'],
      priceRange: '₹₹',
      rating: 4.1,
      numReviews: 95,
      images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest8',
      name: 'The 13th Floor',
      cuisine: ['Continental', 'Rooftop'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 140,
      images: ['https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest9',
      name: 'Toit',
      cuisine: ['Brewery', 'Continental'],
      priceRange: '₹₹',
      rating: 4.4,
      numReviews: 190,
      images: ['https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest10',
      name: 'Hype',
      cuisine: ['Bar', 'Multi-cuisine'],
      priceRange: '₹₹',
      rating: 4.0,
      numReviews: 85,
      images: ['https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest11',
      name: 'Arbor Brewing Company',
      cuisine: ['Brewery', 'American'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 130,
      images: ['https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest12',
      name: 'Byg Brewski Brewing Co.',
      cuisine: ['Brewery', 'Continental'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 170,
      images: ['https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest13',
      name: 'Olive Beach',
      cuisine: ['Mediterranean', 'European'],
      priceRange: '₹₹₹',
      rating: 4.6,
      numReviews: 145,
      images: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest14',
      name: 'Wabi Sabi',
      cuisine: ['Japanese', 'Asian'],
      priceRange: '₹₹₹',
      rating: 4.4,
      numReviews: 115,
      images: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest15',
      name: 'Skyye',
      cuisine: ['Rooftop', 'Bar'],
      priceRange: '₹₹₹',
      rating: 4.3,
      numReviews: 125,
      images: ['https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest16',
      name: 'Blue Ginger',
      cuisine: ['Vietnamese', 'Asian'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 135,
      images: ['https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest17',
      name: 'Phobidden Fruit',
      cuisine: ['Vietnamese', 'Asian'],
      priceRange: '₹₹',
      rating: 4.2,
      numReviews: 90,
      images: ['https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest18',
      name: 'Windmills',
      cuisine: ['Brewery', 'Continental'],
      priceRange: '₹₹₹',
      rating: 4.4,
      numReviews: 140,
      images: ['https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest19',
      name: 'Oota',
      cuisine: ['Karnataka', 'Regional'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest20',
      name: 'Karavalli',
      cuisine: ['Coastal', 'Seafood'],
      priceRange: '₹₹₹',
      rating: 4.7,
      numReviews: 160,
      images: ['https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest21',
      name: 'Sunny\'s',
      cuisine: ['Continental', 'European'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 130,
      images: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest22',
      name: 'Toast & Tonic',
      cuisine: ['European', 'Bar'],
      priceRange: '₹₹₹',
      rating: 4.4,
      numReviews: 120,
      images: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest23',
      name: 'Daysie - All Day Casual Bar',
      cuisine: ['Bar', 'Continental'],
      priceRange: '₹₹',
      rating: 4.2,
      numReviews: 95,
      images: ['https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest24',
      name: 'Social',
      cuisine: ['Bar', 'Multi-cuisine'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 140,
      images: ['https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest25',
      name: 'Yataii',
      cuisine: ['Japanese', 'Asian'],
      priceRange: '₹₹₹₹',
      rating: 4.6,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest26',
      name: 'Thai Basil',
      cuisine: ['Thai', 'Asian'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 100,
      images: ['https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest27',
      name: 'ZLB23',
      cuisine: ['Bar', 'Multi-cuisine'],
      priceRange: '₹₹₹',
      rating: 4.1,
      numReviews: 85,
      images: ['https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest28',
      name: 'Rim Naam',
      cuisine: ['Thai', 'Asian'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 120,
      images: ['https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest29',
      name: 'Jamming Goat 3.0',
      cuisine: ['Bar', 'Continental'],
      priceRange: '₹₹',
      rating: 4.2,
      numReviews: 90,
      images: ['https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest30',
      name: 'Nasi and Mee',
      cuisine: ['Malaysian', 'Asian'],
      priceRange: '₹₹',
      rating: 4.4,
      numReviews: 105,
      images: ['https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest31',
      name: 'Navu Project',
      cuisine: ['Modern Indian', 'Fusion'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 95,
      images: ['https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest32',
      name: 'Naru Noodle Bar',
      cuisine: ['Korean', 'Asian'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 85,
      images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest33',
      name: 'Burma Burma',
      cuisine: ['Burmese', 'Asian'],
      priceRange: '₹₹',
      rating: 4.4,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest34',
      name: 'Arirang',
      cuisine: ['Korean', 'Asian'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 100,
      images: ['https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest35',
      name: 'Far & East',
      cuisine: ['Pan-Asian', 'Fine Dining'],
      priceRange: '₹₹₹₹',
      rating: 4.7,
      numReviews: 120,
      images: ['https://images.unsplash.com/photo-1540648639573-8c848de23f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest36',
      name: 'The Konkan',
      cuisine: ['Coastal', 'Seafood'],
      priceRange: '₹₹',
      rating: 4.4,
      numReviews: 95,
      images: ['https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest37',
      name: 'Fishland',
      cuisine: ['Seafood', 'Coastal'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 85,
      images: ['https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest38',
      name: 'Loya',
      cuisine: ['North Indian', 'Fine Dining'],
      priceRange: '₹₹₹',
      rating: 4.6,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest39',
      name: 'Alba',
      cuisine: ['Italian', 'European'],
      priceRange: '₹₹₹₹',
      rating: 4.7,
      numReviews: 130,
      images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest40',
      name: 'Le Cirque',
      cuisine: ['French', 'Fine Dining'],
      priceRange: '₹₹₹₹',
      rating: 4.8,
      numReviews: 140,
      images: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest41',
      name: 'Persian Terrace',
      cuisine: ['Middle Eastern', 'Mediterranean'],
      priceRange: '₹₹₹',
      rating: 4.5,
      numReviews: 115,
      images: ['https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest42',
      name: '23rd Street Pizza',
      cuisine: ['Italian', 'Pizza'],
      priceRange: '₹₹',
      rating: 4.2,
      numReviews: 95,
      images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest43',
      name: 'Muro',
      cuisine: ['Italian', 'European'],
      priceRange: '₹₹₹',
      rating: 4.4,
      numReviews: 105,
      images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest44',
      name: 'SodaBottleOpenerwala',
      cuisine: ['Parsi', 'Indian'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 120,
      images: ['https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest45',
      name: 'The Biere Club',
      cuisine: ['Brewery', 'Continental'],
      priceRange: '₹₹',
      rating: 4.2,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest46',
      name: 'Cajsa',
      cuisine: ['Pizza', 'Italian'],
      priceRange: '₹₹',
      rating: 4.1,
      numReviews: 85,
      images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest47',
      name: 'The Bier Library',
      cuisine: ['Brewery', 'Continental'],
      priceRange: '₹₹',
      rating: 4.3,
      numReviews: 100,
      images: ['https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest48',
      name: 'Nagarjuna',
      cuisine: ['Andhra', 'South Indian'],
      priceRange: '₹₹',
      rating: 4.5,
      numReviews: 150,
      images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest49',
      name: 'Foo',
      cuisine: ['Asian', 'Chinese'],
      priceRange: '₹₹₹',
      rating: 4.4,
      numReviews: 110,
      images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    },
    {
      _id: 'rest50',
      name: 'Lucky Chan',
      cuisine: ['Chinese', 'Asian'],
      priceRange: '₹₹₹',
      rating: 4.3,
      numReviews: 95,
      images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80']
    }
  ];

  // Initialize restaurants with all mock data on component mount
  useEffect(() => {
    setRestaurants(mockRestaurants);
    setLoading(false);
  }, []);

  // Filter restaurants when search term or filters change
  useEffect(() => {
    if (searchTerm === '' && !filters.cuisine && !filters.priceRange && !filters.rating) {
      // If no filters are applied, show all restaurants
      setRestaurants(mockRestaurants);
      return;
    }

    const filterRestaurants = () => {
      try {
        setLoading(true);
        // Filter mock data based on search and filters
        let filteredMockData = [...mockRestaurants];
        
        // Apply search term filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredMockData = filteredMockData.filter(restaurant => 
            restaurant.name.toLowerCase().includes(term) || 
            restaurant.cuisine.some(c => c.toLowerCase().includes(term))
          );
        }
        
        // Apply cuisine filter
        if (filters.cuisine) {
          filteredMockData = filteredMockData.filter(restaurant => 
            restaurant.cuisine.includes(filters.cuisine)
          );
        }
        
        // Apply price range filter
        if (filters.priceRange) {
          filteredMockData = filteredMockData.filter(restaurant => 
            restaurant.priceRange === filters.priceRange
          );
        }
        
        // Apply rating filter
        if (filters.rating) {
          const minRating = parseInt(filters.rating);
          filteredMockData = filteredMockData.filter(restaurant => 
            restaurant.rating >= minRating
          );
        }
        
        setRestaurants(filteredMockData);
        setLoading(false);
      } catch (err) {
        console.error('Error filtering restaurants:', err);
        setLoading(false);
      }
    };

    // Use a timeout to debounce the filtering
    const timeoutId = setTimeout(() => {
      filterRestaurants();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filters.cuisine, filters.priceRange, filters.rating]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setFilters({
      cuisine: '',
      priceRange: '',
      rating: '',
    });
  };

  // Cuisine options for filtering
  const cuisines = ['Italian', 'Chinese', 'Indian', 'Japanese', 'Thai', 'American', 'Continental', 'Asian', 'Bar', 'Brewery', 'Seafood', 'European', 'Mediterranean', 'Korean', 'Vietnamese', 'Fine Dining'];
  const priceRanges = ['₹', '₹₹', '₹₹₹', '₹₹₹₹'];

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Delicious Food Delivered To Your Door</h1>
          <p>Order from your favorite restaurants and enjoy at home</p>
          <div className="search-container">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for restaurants or cuisines..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="search-buttons">
              <button className="view-button" onClick={() => setViewMode('grid')} title="Grid View">
                <FaTh className={viewMode === 'grid' ? 'active' : ''} />
              </button>
              <button className="view-button" onClick={() => setViewMode('list')} title="List View">
                <FaList className={viewMode === 'list' ? 'active' : ''} />
              </button>
              <button className="filter-button" onClick={toggleFilters}>
                <FaFilter /> Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="filters">
              <div className="filter-group">
                <label>Cuisine</label>
                <select
                  name="cuisine"
                  value={filters.cuisine}
                  onChange={handleFilterChange}
                >
                  <option value="">All Cuisines</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range</label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                >
                  <option value="">All Price Ranges</option>
                  {priceRanges.map((price) => (
                    <option key={price} value={price}>
                      {price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Rating</label>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                >
                  <option value="">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>

              <button className="reset-button" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="restaurant-list">
        <h2>Popular Restaurants Near You</h2>
        {restaurants.length === 0 ? (
          <div className="no-results">No restaurants found matching your criteria</div>
        ) : (
          <div className={viewMode === 'grid' ? 'restaurant-grid' : 'restaurant-list-view'}>
            {restaurants.map((restaurant) => (
              <Link to={`/restaurants/${restaurant._id}`} key={restaurant._id} className="restaurant-card">
                <div className="restaurant-image">
                  <img src={restaurant.images[0]} alt={restaurant.name} />
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <div className="restaurant-meta">
                    <span>{restaurant.cuisine.join(', ')}</span>
                    <span>{restaurant.priceRange}</span>
                  </div>
                  <div className="restaurant-rating">
                    <FaStar className="star-icon" />
                    <span>{restaurant.rating}</span>
                    <span className="review-count">({restaurant.numReviews} reviews)</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;