const Restaurant = require('../models/Restaurant');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
exports.getRestaurants = async (req, res) => {
  try {
    // Restaurant data for development
    // Generate unique images for each restaurant
    const getUniqueImage = (index) => {
      const imageIds = [
        '1513104890138-7c749659a591', '1589301760014-d929f3979dbc', '1579871494447-9811cf80d66c',
        '1559526324-593bc073d938', '1517248135467-4c7edcad34c4', '1514933651103-005eec06c04b',
        '1555396273-367ea4eb4db5', '1600891964599-f61ba0e24092', '1559526324-4b87b5e36e44',
        '1470337458703-46ad1756a187', '1574711902264-e80630393a05', '1544148103-0773bf10d330',
        '1579871494447-9811cf80d66c', '1572116469696-31de0f17cc34', '1540648639573-8c848de23f0a',
        '1559314809-0d155014e29e', '1569718212165-3a8278d5f624', '1585937421612-70a008356cf4',
        '1579684947550-22e945225d9a', '1571407970349-bc81e7e96d47', '1533777857889-4be7c70b33f7',
        '1550966871-3ed3cdb5ed0c', '1498837167922-ddd27525d352', '1466978913421-dad2ebd01d17',
        '1594212699903-ec8a3eca50f5', '1561501878-aabd62634533', '1543007630-9710e4a00a20',
        '1563245372-f21724e3856d', '1562565652-a0d8f0c59eb4', '1534766555764-ce878a5e3a2b',
        '1505253758473-96b7015fcd40', '1542367592-8849eb970322', '1615141982883-c7ad0e69fd62',
        '1559339352-11d035aa65de', '1565299624946-b28f40a0ae38', '1552566626-52f8b828add9',
        '1414235077428-338989a2e8c0', '1590846406792-0adc7f938f1d', '1551218808-94e220e084d2',
        '1578474846511-04ba529f0b88', '1590577976322-3d2d6e2130d5', '1551632436-cbf8dd35adfa',
        '1559329007-40df8a9345d8', '1578662996442-48f60103fc96', '1551632811-561732d1e306',
        '1590846083693-f23fdede3a7e', '1566633806327-68e152aaf26d', '1567696911980-2c295b095e02',
        '1601050690597-df0568f70950', '1553621042-f6e147245754', '1617196034183-421b4917c92d'
      ];
      return `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`;
    };

    const mockRestaurants = [
      {
        _id: 'rest1',
        name: 'Tiamo',
        cuisine: ['Italian', 'European'],
        priceRange: '$$$',
        rating: 4.6,
        numReviews: 150,
        images: [getUniqueImage(0)]
      },
      {
        _id: 'rest2',
        name: 'Shri Sagar CTR',
        cuisine: ['South Indian', 'Vegetarian'],
        priceRange: '$',
        rating: 4.5,
        numReviews: 200,
        images: [getUniqueImage(1)]
      },
      {
        _id: 'rest3',
        name: 'Kuuraku',
        cuisine: ['Japanese', 'Asian'],
        priceRange: '$$',
        rating: 4.4,
        numReviews: 120,
        images: [getUniqueImage(2)]
      },
      {
        _id: 'rest4',
        name: 'Geist Brewing Co., OMR',
        cuisine: ['Brewery', 'Continental'],
        priceRange: '$$$',
        rating: 4.3,
        numReviews: 180,
        images: [getUniqueImage(3)]
      },
      {
        _id: 'rest5',
        name: 'Bang At The Ritz-Carlton',
        cuisine: ['Fine Dining', 'Multi-cuisine'],
        priceRange: '$$$$',
        rating: 4.8,
        numReviews: 160,
        images: [getUniqueImage(4)]
      },
      {
        _id: 'rest6',
        name: 'Bob\'s',
        cuisine: ['American', 'Bar'],
        priceRange: '$$',
        rating: 4.2,
        numReviews: 110,
        images: [getUniqueImage(5)]
      },
      {
        _id: 'rest7',
        name: 'Roxie',
        cuisine: ['Continental', 'Bar'],
        priceRange: '$$',
        rating: 4.1,
        numReviews: 95,
        images: [getUniqueImage(6)]
      },
      {
        _id: 'rest8',
        name: 'The 13th Floor',
        cuisine: ['Continental', 'Rooftop'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 140,
        images: [getUniqueImage(7)]
      },
      {
        _id: 'rest9',
        name: 'Toit',
        cuisine: ['Brewery', 'Continental'],
        priceRange: '$$',
        rating: 4.4,
        numReviews: 190,
        images: [getUniqueImage(8)]
      },
      {
        _id: 'rest10',
        name: 'Hype',
        cuisine: ['Bar', 'Multi-cuisine'],
        priceRange: '$$',
        rating: 4.0,
        numReviews: 85,
        images: [getUniqueImage(9)]
      },
      {
        _id: 'rest11',
        name: 'Arbor Brewing Company',
        cuisine: ['Brewery', 'American'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 130,
        images: [getUniqueImage(10)]
      },
      {
        _id: 'rest12',
        name: 'Byg Brewski Brewing Co.',
        cuisine: ['Brewery', 'Continental'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 170,
        images: [getUniqueImage(11)]
      },
      {
        _id: 'rest13',
        name: 'Olive Beach',
        cuisine: ['Mediterranean', 'European'],
        priceRange: '$$$',
        rating: 4.6,
        numReviews: 145,
        images: [getUniqueImage(12)]
      },
      {
        _id: 'rest14',
        name: 'Wabi Sabi',
        cuisine: ['Japanese', 'Asian'],
        priceRange: '$$$',
        rating: 4.4,
        numReviews: 115,
        images: [getUniqueImage(13)]
      },
      {
        _id: 'rest15',
        name: 'Skyye',
        cuisine: ['Rooftop', 'Bar'],
        priceRange: '$$$',
        rating: 4.3,
        numReviews: 125,
        images: [getUniqueImage(14)]
      },
      {
        _id: 'rest16',
        name: 'Blue Ginger',
        cuisine: ['Vietnamese', 'Asian'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 135,
        images: [getUniqueImage(15)]
      },
      {
        _id: 'rest17',
        name: 'Phobidden Fruit',
        cuisine: ['Vietnamese', 'Asian'],
        priceRange: '$$',
        rating: 4.2,
        numReviews: 90,
        images: [getUniqueImage(16)]
      },
      {
        _id: 'rest18',
        name: 'Windmills',
        cuisine: ['Brewery', 'Continental'],
        priceRange: '$$$',
        rating: 4.4,
        numReviews: 140,
        images: [getUniqueImage(17)]
      },
      {
        _id: 'rest19',
        name: 'Oota',
        cuisine: ['Karnataka', 'Regional'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 110,
        images: [getUniqueImage(18)]
      },
      {
        _id: 'rest20',
        name: 'Karavalli',
        cuisine: ['Coastal', 'Seafood'],
        priceRange: '$$$',
        rating: 4.7,
        numReviews: 160,
        images: [getUniqueImage(19)]
      },
      {
        _id: 'rest21',
        name: 'Sunny\'s',
        cuisine: ['Continental', 'European'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 130,
        images: [getUniqueImage(20)]
      },
      {
        _id: 'rest22',
        name: 'Toast & Tonic',
        cuisine: ['European', 'Bar'],
        priceRange: '$$$',
        rating: 4.4,
        numReviews: 120,
        images: [getUniqueImage(21)]
      },
      {
        _id: 'rest23',
        name: 'Daysie - All Day Casual Bar',
        cuisine: ['Bar', 'Continental'],
        priceRange: '$$',
        rating: 4.2,
        numReviews: 95,
        images: [getUniqueImage(22)]
      },
      {
        _id: 'rest24',
        name: 'Social',
        cuisine: ['Bar', 'Multi-cuisine'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 140,
        images: [getUniqueImage(23)]
      },
      {
        _id: 'rest25',
        name: 'Yataii',
        cuisine: ['Japanese', 'Asian'],
        priceRange: '$$$$',
        rating: 4.6,
        numReviews: 110,
        images: [getUniqueImage(24)]
      },
      {
        _id: 'rest26',
        name: 'Thai Basil',
        cuisine: ['Thai', 'Asian'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 100,
        images: [getUniqueImage(25)]
      },
      {
        _id: 'rest27',
        name: 'ZLB23',
        cuisine: ['Bar', 'Multi-cuisine'],
        priceRange: '$$$',
        rating: 4.1,
        numReviews: 85,
        images: [getUniqueImage(26)]
      },
      {
        _id: 'rest28',
        name: 'Rim Naam',
        cuisine: ['Thai', 'Asian'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 120,
        images: [getUniqueImage(27)]
      },
      {
        _id: 'rest29',
        name: 'Jamming Goat 3.0',
        cuisine: ['Bar', 'Continental'],
        priceRange: '$$',
        rating: 4.2,
        numReviews: 90,
        images: [getUniqueImage(28)]
      },
      {
        _id: 'rest30',
        name: 'Nasi and Mee',
        cuisine: ['Malaysian', 'Asian'],
        priceRange: '$$',
        rating: 4.4,
        numReviews: 105,
        images: [getUniqueImage(29)]
      },
      {
        _id: 'rest31',
        name: 'Navu Project',
        cuisine: ['Modern Indian', 'Fusion'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 95,
        images: [getUniqueImage(30)]
      },
      {
        _id: 'rest32',
        name: 'Naru Noodle Bar',
        cuisine: ['Korean', 'Asian'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 85,
        images: [getUniqueImage(31)]
      },
      {
        _id: 'rest33',
        name: 'Burma Burma',
        cuisine: ['Burmese', 'Asian'],
        priceRange: '$$',
        rating: 4.4,
        numReviews: 110,
        images: [getUniqueImage(32)]
      },
      {
        _id: 'rest34',
        name: 'Arirang',
        cuisine: ['Korean', 'Asian'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 100,
        images: [getUniqueImage(33)]
      },
      {
        _id: 'rest35',
        name: 'Far & East',
        cuisine: ['Pan-Asian', 'Fine Dining'],
        priceRange: '$$$$',
        rating: 4.7,
        numReviews: 120,
        images: [getUniqueImage(34)]
      },
      {
        _id: 'rest36',
        name: 'The Konkan',
        cuisine: ['Coastal', 'Seafood'],
        priceRange: '$$',
        rating: 4.4,
        numReviews: 95,
        images: [getUniqueImage(35)]
      },
      {
        _id: 'rest37',
        name: 'Fishland',
        cuisine: ['Seafood', 'Coastal'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 85,
        images: [getUniqueImage(36)]
      },
      {
        _id: 'rest38',
        name: 'Loya',
        cuisine: ['North Indian', 'Fine Dining'],
        priceRange: '$$$',
        rating: 4.6,
        numReviews: 110,
        images: [getUniqueImage(37)]
      },
      {
        _id: 'rest39',
        name: 'Alba',
        cuisine: ['Italian', 'European'],
        priceRange: '$$$$',
        rating: 4.7,
        numReviews: 130,
        images: [getUniqueImage(38)]
      },
      {
        _id: 'rest40',
        name: 'Le Cirque',
        cuisine: ['French', 'Fine Dining'],
        priceRange: '$$$$',
        rating: 4.8,
        numReviews: 140,
        images: [getUniqueImage(39)]
      },
      {
        _id: 'rest41',
        name: 'Persian Terrace',
        cuisine: ['Middle Eastern', 'Mediterranean'],
        priceRange: '$$$',
        rating: 4.5,
        numReviews: 115,
        images: [getUniqueImage(40)]
      },
      {
        _id: 'rest42',
        name: '23rd Street Pizza',
        cuisine: ['Italian', 'Pizza'],
        priceRange: '$$',
        rating: 4.2,
        numReviews: 95,
        images: [getUniqueImage(41)]
      },
      {
        _id: 'rest43',
        name: 'Muro',
        cuisine: ['Italian', 'European'],
        priceRange: '$$$',
        rating: 4.4,
        numReviews: 105,
        images: [getUniqueImage(42)]
      },
      {
        _id: 'rest44',
        name: 'SodaBottleOpenerwala',
        cuisine: ['Parsi', 'Indian'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 120,
        images: [getUniqueImage(43)]
      },
      {
        _id: 'rest45',
        name: 'The Biere Club',
        cuisine: ['Brewery', 'Continental'],
        priceRange: '$$',
        rating: 4.2,
        numReviews: 110,
        images: [getUniqueImage(44)]
      },
      {
        _id: 'rest46',
        name: 'Cajsa',
        cuisine: ['Pizza', 'Italian'],
        priceRange: '$$',
        rating: 4.1,
        numReviews: 85,
        images: [getUniqueImage(45)]
      },
      {
        _id: 'rest47',
        name: 'The Bier Library',
        cuisine: ['Brewery', 'Continental'],
        priceRange: '$$',
        rating: 4.3,
        numReviews: 100,
        images: [getUniqueImage(46)]
      },
      {
        _id: 'rest48',
        name: 'Nagarjuna',
        cuisine: ['Andhra', 'South Indian'],
        priceRange: '$$',
        rating: 4.5,
        numReviews: 150,
        images: [getUniqueImage(47)]
      },
      {
        _id: 'rest49',
        name: 'Foo',
        cuisine: ['Asian', 'Chinese'],
        priceRange: '$$$',
        rating: 4.4,
        numReviews: 110,
        images: [getUniqueImage(48)]
      },
      {
        _id: 'rest50',
        name: 'Lucky Chan',
        cuisine: ['Chinese', 'Asian'],
        priceRange: '$$$',
        rating: 4.3,
        numReviews: 95,
        images: [getUniqueImage(49)]
      }
    ];

    // Filter mock data based on query parameters
    let filteredRestaurants = [...mockRestaurants];
    
    // Filter by cuisine
    if (req.query.cuisine) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.cuisine.includes(req.query.cuisine)
      );
    }

    // Filter by price range
    if (req.query.priceRange) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.priceRange === req.query.priceRange
      );
    }

    // Filter by rating
    if (req.query.rating) {
      const minRating = parseFloat(req.query.rating);
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.rating >= minRating
      );
    }

    // Search by name
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm))
      );
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = filteredRestaurants.length;

    const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: paginatedRestaurants.length,
      pagination,
      data: paginatedRestaurants,
    });
    
    /* Commented out the actual database query for now
    let query = Restaurant.find({ isActive: true });

    // Filter by cuisine
    if (req.query.cuisine) {
      query = query.where('cuisine').equals(req.query.cuisine);
    }

    // Filter by price range
    if (req.query.priceRange) {
      query = query.where('priceRange').equals(req.query.priceRange);
    }

    // Filter by rating
    if (req.query.rating) {
      query = query.where('rating').gte(req.query.rating);
    }

    // Search by name
    if (req.query.search) {
      query = query.where('name').regex(new RegExp(req.query.search, 'i'));
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Restaurant.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const restaurants = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: restaurants.length,
      pagination,
      data: restaurants,
    });
    */
  } catch (error) {
    console.error('Error in getRestaurants:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
exports.getRestaurant = async (req, res) => {
  try {
    // For development, return mock data instead of querying the database
    const id = req.params.id;
    
    // Create mock restaurant data
    const mockRestaurant = {
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
      priceRange: id === 'rest1' ? '$$$' : 
                 id === 'rest2' ? '$' : 
                 id === 'rest3' ? '$$' : 
                 id === 'rest4' ? '$$$' : 
                 id === 'rest5' ? '$$$$' : '$$',
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
      address: {
        street: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345'
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
      ],
      menus: [{
        _id: 'menu1',
        name: 'Main Menu',
        categories: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
        items: [
          {
            _id: 'item1',
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil',
            price: 12.99,
            category: 'Main Course',
            image: 'https://via.placeholder.com/150',
            isVegetarian: true,
          },
          {
            _id: 'item2',
            name: 'Caesar Salad',
            description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
            price: 8.99,
            category: 'Appetizers',
            image: 'https://via.placeholder.com/150',
          },
          {
            _id: 'item3',
            name: 'Chocolate Cake',
            description: 'Rich chocolate cake with a molten center',
            price: 6.99,
            category: 'Desserts',
            image: 'https://via.placeholder.com/150',
          },
          {
            _id: 'item4',
            name: 'Iced Tea',
            description: 'Refreshing iced tea with lemon',
            price: 2.99,
            category: 'Beverages',
            image: 'https://via.placeholder.com/150',
          },
        ],
      }]
    };

    // Return the mock restaurant data
    res.status(200).json({
      success: true,
      data: mockRestaurant,
    });
    
    /* Commented out the actual database query for now
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('menus')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name',
        },
      });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
    */
  } catch (error) {
    console.error('Error in getRestaurant:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new restaurant
// @route   POST /api/restaurants
// @access  Private (Restaurant Owner, Admin)
exports.createRestaurant = async (req, res) => {
  try {
    // Add user to req.body
    req.body.owner = req.user.id;

    // Check if user already has a restaurant
    if (req.user.role !== 'admin') {
      const existingRestaurant = await Restaurant.findOne({ owner: req.user.id });

      if (existingRestaurant) {
        return res.status(400).json({
          success: false,
          message: 'User already has a restaurant',
        });
      }
    }

    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private (Restaurant Owner, Admin)
exports.updateRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    // Make sure user is restaurant owner or admin
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this restaurant',
      });
    }

    restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private (Restaurant Owner, Admin)
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    // Make sure user is restaurant owner or admin
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this restaurant',
      });
    }

    await restaurant.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};