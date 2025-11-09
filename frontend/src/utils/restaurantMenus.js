// Restaurant-specific menu items

export const getRestaurantMenu = (restaurantId) => {
  // Extract the restaurant number if it follows the pattern 'rest##'
  const restNumber = parseInt(restaurantId.replace('rest', '')) || 0;
  
  // Group restaurants by cuisine type to provide appropriate menus
  let menuType = 'default';
  
  // Italian restaurants
  if ([1, 39, 42, 43, 46].includes(restNumber)) {
    menuType = 'italian';
  }
  // Asian restaurants
  else if ([3, 14, 25, 32, 33, 34, 35, 49, 50].includes(restNumber)) {
    menuType = 'asian';
  }
  // Indian restaurants
  else if ([2, 19, 31, 38, 44, 48].includes(restNumber)) {
    menuType = 'indian';
  }
  // Brewery/Bar restaurants
  else if ([4, 6, 7, 9, 10, 11, 12, 18, 23, 24, 27, 29, 45, 47].includes(restNumber)) {
    menuType = 'brewery';
  }
  // Fine dining restaurants
  else if ([5, 8, 13, 15, 21, 22, 40].includes(restNumber)) {
    menuType = 'fine_dining';
  }
  // Seafood restaurants
  else if ([20, 36, 37].includes(restNumber)) {
    menuType = 'seafood';
  }
  // Thai/Vietnamese restaurants
  else if ([16, 17, 26, 28, 30].includes(restNumber)) {
    menuType = 'thai_vietnamese';
  }
  
  const menus = {
    // Italian cuisine menu
    italian: {
      _id: `menu-${restaurantId}`,
      name: 'Italian Menu',
      categories: ['Appetizers', 'Pasta', 'Pizza', 'Desserts', 'Beverages'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'Bruschetta',
          description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
          price: 4.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Calamari Fritti',
          description: 'Crispy fried calamari served with marinara sauce and lemon wedges',
          price: 5.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Caprese Salad',
          description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
          price: 4.49,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Antipasto Platter',
          description: 'Selection of cured meats, cheeses, olives, and vegetables',
          price: 6.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Spaghetti Carbonara',
          description: 'Classic pasta dish with eggs, cheese, pancetta, and black pepper',
          price: 7.99,
          category: 'Pasta',
          image: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'Fettuccine Alfredo',
          description: 'Fettuccine pasta in a rich and creamy parmesan sauce',
          price: 7.49,
          category: 'Pasta',
          image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Lasagna',
          description: 'Layers of pasta, ricotta cheese, and bolognese sauce, baked to perfection',
          price: 8.99,
          category: 'Pasta',
          image: 'https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Penne Arrabbiata',
          description: 'Spicy tomato sauce with garlic, chili, and herbs',
          price: 6.99,
          category: 'Pasta',
          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Margherita Pizza',
          description: 'Traditional pizza with tomato sauce, mozzarella, and fresh basil',
          price: 6.99,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Pepperoni Pizza',
          description: 'Classic pizza topped with tomato sauce, mozzarella, and pepperoni',
          price: 7.99,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Quattro Formaggi',
          description: 'Four cheese pizza with mozzarella, gorgonzola, parmesan, and ricotta',
          price: 8.49,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Vegetarian Pizza',
          description: 'Fresh vegetables, bell peppers, mushrooms, and olives',
          price: 7.49,
          category: 'Pizza',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item13-${restaurantId}`,
          name: 'Tiramisu',
          description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
          price: 3.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item14-${restaurantId}`,
          name: 'Panna Cotta',
          description: 'Silky smooth vanilla cream dessert with berry compote',
          price: 3.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item15-${restaurantId}`,
          name: 'Cannoli',
          description: 'Crispy pastry tubes filled with sweet ricotta cream and chocolate chips',
          price: 2.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1623246935088-d3611317fcb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item16-${restaurantId}`,
          name: 'Gelato',
          description: 'Italian ice cream - vanilla, chocolate, or strawberry',
          price: 2.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item17-${restaurantId}`,
          name: 'Italian Soda',
          description: 'Sparkling water with fruit syrup',
          price: 1.99,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item18-${restaurantId}`,
          name: 'Espresso',
          description: 'Strong Italian coffee',
          price: 1.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item19-${restaurantId}`,
          name: 'Cappuccino',
          description: 'Espresso with steamed milk and foam',
          price: 2.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item20-${restaurantId}`,
          name: 'Fresh Lemonade',
          description: 'Freshly squeezed lemon juice with sparkling water',
          price: 1.99,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
      ],
    },
    
    // Indian cuisine menu
    indian: {
      _id: `menu-${restaurantId}`,
      name: 'Indian Menu',
      categories: ['Starters', 'Main Course', 'Breads', 'Rice', 'Desserts', 'Beverages'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'Vegetable Samosa (2 pcs)',
          description: 'Crispy pastry filled with spiced potatoes and peas',
          price: 2.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Paneer Tikka',
          description: 'Marinated and grilled cottage cheese with bell peppers and onions',
          price: 4.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 2
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Chicken Tikka',
          description: 'Tender pieces of chicken marinated in yogurt and spices, grilled to perfection',
          price: 5.49,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 2
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Aloo Tikki',
          description: 'Crispy potato patties served with chutneys',
          price: 2.49,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Butter Chicken',
          description: 'Tender chicken in a rich and creamy tomato-based sauce',
          price: 7.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 1
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'Palak Paneer',
          description: 'Cottage cheese cubes in a creamy spinach sauce',
          price: 6.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Dal Makhani',
          description: 'Creamy black lentils cooked with butter and spices',
          price: 5.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356cf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Chicken Curry',
          description: 'Traditional chicken curry with onions and tomatoes',
          price: 7.49,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 2
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Naan',
          description: 'Traditional Indian bread baked in a tandoor oven',
          price: 1.49,
          category: 'Breads',
          image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Garlic Naan',
          description: 'Naan bread topped with garlic and butter',
          price: 1.99,
          category: 'Breads',
          image: 'https://images.unsplash.com/photo-1584736286279-75261f487097?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Roti',
          description: 'Whole wheat flatbread',
          price: 0.99,
          category: 'Breads',
          image: 'https://images.unsplash.com/photo-1619894991209-9f9694be045a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Paratha',
          description: 'Layered flatbread cooked with ghee',
          price: 1.99,
          category: 'Breads',
          image: 'https://images.unsplash.com/photo-1619894991209-9f9694be045a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item13-${restaurantId}`,
          name: 'Chicken Biryani',
          description: 'Fragrant basmati rice cooked with chicken and aromatic spices',
          price: 8.99,
          category: 'Rice',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 2
        },
        {
          _id: `item14-${restaurantId}`,
          name: 'Vegetable Biryani',
          description: 'Aromatic basmati rice with mixed vegetables and spices',
          price: 6.99,
          category: 'Rice',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item15-${restaurantId}`,
          name: 'Jeera Rice',
          description: 'Basmati rice cooked with cumin seeds',
          price: 3.99,
          category: 'Rice',
          image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item16-${restaurantId}`,
          name: 'Gulab Jamun (2 pcs)',
          description: 'Deep-fried milk solids soaked in sugar syrup',
          price: 2.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1589227365295-a3f96c3e6ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item17-${restaurantId}`,
          name: 'Rasmalai (2 pcs)',
          description: 'Soft cottage cheese patties soaked in sweetened, thickened milk',
          price: 2.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item18-${restaurantId}`,
          name: 'Kheer',
          description: 'Rice pudding with cardamom, saffron, and nuts',
          price: 2.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1633383718081-22ac93e3db65?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item19-${restaurantId}`,
          name: 'Kulfi',
          description: 'Traditional Indian ice cream with cardamom and pistachios',
          price: 1.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item20-${restaurantId}`,
          name: 'Masala Chai',
          description: 'Spiced Indian tea with milk',
          price: 1.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item21-${restaurantId}`,
          name: 'Lassi',
          description: 'Yogurt-based drink - sweet or salty',
          price: 1.99,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item22-${restaurantId}`,
          name: 'Fresh Lime Water',
          description: 'Refreshing lime juice with water and mint',
          price: 1.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
      ],
    },
    
    // Asian cuisine menu
    asian: {
      _id: `menu-${restaurantId}`,
      name: 'Asian Menu',
      categories: ['Appetizers', 'Sushi', 'Noodles', 'Main Course', 'Rice', 'Desserts', 'Beverages'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'Gyoza (6 pcs)',
          description: 'Pan-fried pork dumplings with dipping sauce',
          price: 3.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Spring Rolls (4 pcs)',
          description: 'Crispy vegetable spring rolls with sweet chili sauce',
          price: 2.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Chicken Satay (4 pcs)',
          description: 'Grilled chicken skewers with peanut sauce',
          price: 4.49,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Edamame',
          description: 'Steamed soybeans with sea salt',
          price: 2.49,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1609501676725-7186f0a1b4d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Salmon Nigiri (2 pcs)',
          description: 'Fresh salmon slices over pressed vinegared rice',
          price: 3.99,
          category: 'Sushi',
          image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'California Roll (8 pcs)',
          description: 'Sushi roll with crab, avocado, and cucumber',
          price: 4.99,
          category: 'Sushi',
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Spicy Tuna Roll (8 pcs)',
          description: 'Sushi roll with spicy tuna and cucumber',
          price: 5.49,
          category: 'Sushi',
          image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 2
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Vegetable Roll (8 pcs)',
          description: 'Fresh vegetables wrapped in sushi rice and nori',
          price: 3.99,
          category: 'Sushi',
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Tonkotsu Ramen',
          description: 'Rich pork bone broth with ramen noodles, chashu pork, and soft-boiled egg',
          price: 7.99,
          category: 'Noodles',
          image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Pad Thai',
          description: 'Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts',
          price: 6.99,
          category: 'Noodles',
          image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 1
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Vegetable Lo Mein',
          description: 'Stir-fried noodles with mixed vegetables in savory sauce',
          price: 5.99,
          category: 'Noodles',
          image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Udon Soup',
          description: 'Thick wheat noodles in savory broth with vegetables',
          price: 6.49,
          category: 'Noodles',
          image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item13-${restaurantId}`,
          name: 'Kung Pao Chicken',
          description: 'Stir-fried chicken with peanuts, vegetables, and chili peppers',
          price: 7.49,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 3
        },
        {
          _id: `item14-${restaurantId}`,
          name: 'Beef Bulgogi',
          description: 'Korean marinated beef with rice and vegetables',
          price: 8.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1583952875272-a75134f5e369?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item15-${restaurantId}`,
          name: 'Sweet and Sour Pork',
          description: 'Crispy pork with bell peppers and pineapple in tangy sauce',
          price: 7.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item16-${restaurantId}`,
          name: 'Teriyaki Chicken',
          description: 'Grilled chicken glazed with teriyaki sauce',
          price: 7.49,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item17-${restaurantId}`,
          name: 'Vegetable Bibimbap',
          description: 'Korean mixed rice bowl with vegetables and gochujang sauce',
          price: 6.99,
          category: 'Rice',
          image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item18-${restaurantId}`,
          name: 'Chicken Fried Rice',
          description: 'Wok-fried rice with chicken, eggs, and vegetables',
          price: 6.49,
          category: 'Rice',
          image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item19-${restaurantId}`,
          name: 'Vegetable Fried Rice',
          description: 'Wok-fried rice with mixed vegetables and soy sauce',
          price: 5.49,
          category: 'Rice',
          image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item20-${restaurantId}`,
          name: 'Steamed Rice',
          description: 'Plain steamed jasmine rice',
          price: 2.99,
          category: 'Rice',
          image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item21-${restaurantId}`,
          name: 'Matcha Ice Cream',
          description: 'Green tea flavored ice cream',
          price: 2.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item22-${restaurantId}`,
          name: 'Mochi Ice Cream (3 pcs)',
          description: 'Japanese rice cake filled with ice cream',
          price: 2.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item23-${restaurantId}`,
          name: 'Mango Sticky Rice',
          description: 'Thai dessert with sweet sticky rice and fresh mango',
          price: 3.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item24-${restaurantId}`,
          name: 'Red Bean Ice Cream',
          description: 'Traditional Asian dessert with sweet red bean flavor',
          price: 2.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item25-${restaurantId}`,
          name: 'Green Tea',
          description: 'Traditional hot green tea',
          price: 1.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item26-${restaurantId}`,
          name: 'Thai Iced Tea',
          description: 'Sweet and creamy Thai tea with ice',
          price: 2.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item27-${restaurantId}`,
          name: 'Fresh Coconut Water',
          description: 'Natural coconut water served fresh',
          price: 2.99,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item28-${restaurantId}`,
          name: 'Lychee Juice',
          description: 'Sweet and refreshing lychee fruit juice',
          price: 2.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
      ],
    },
    
    // Brewery/Bar menu
    brewery: {
      _id: `menu-${restaurantId}`,
      name: 'Brewery Menu',
      categories: ['Craft Beers', 'Appetizers', 'Burgers', 'Main Course', 'Sides', 'Desserts', 'Non-Alcoholic'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'House IPA',
          description: 'Hoppy India Pale Ale with citrus notes',
          price: 6.99,
          category: 'Craft Beers',
          image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Wheat Beer',
          description: 'Belgian-style wheat beer with notes of orange and coriander',
          price: 6.49,
          category: 'Craft Beers',
          image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Stout',
          description: 'Rich and creamy dark beer with coffee and chocolate notes',
          price: 7.49,
          category: 'Craft Beers',
          image: 'https://images.unsplash.com/photo-1567696911980-2c295b095e02?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Loaded Nachos',
          description: 'Tortilla chips topped with cheese, jalapeños, salsa, and sour cream',
          price: 9.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Buffalo Wings',
          description: 'Crispy chicken wings tossed in spicy buffalo sauce',
          price: 10.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 2
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'Onion Rings',
          description: 'Beer-battered onion rings with dipping sauce',
          price: 7.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Pulled Pork Burger',
          description: 'Slow-cooked pulled pork with BBQ sauce in a brioche bun',
          price: 13.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Fish and Chips',
          description: 'Beer-battered fish with crispy fries and tartar sauce',
          price: 14.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Veggie Burger',
          description: 'Plant-based patty with lettuce, tomato, and special sauce',
          price: 12.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Chocolate Brownie',
          description: 'Warm chocolate brownie served with vanilla ice cream',
          price: 6.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Apple Crumble',
          description: 'Warm apple crumble with cinnamon and vanilla ice cream',
          price: 7.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Cheesecake',
          description: 'Classic cheesecake with berry compote',
          price: 6.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
      ],
    },
    
    // Fine Dining menu
    fine_dining: {
      _id: `menu-${restaurantId}`,
      name: 'Fine Dining Menu',
      categories: ['Appetizers', 'Main Course', 'Seafood', 'Desserts'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'Truffle Arancini',
          description: 'Crispy risotto balls with truffle and parmesan',
          price: 16.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Foie Gras',
          description: 'Seared foie gras with brioche toast and fig compote',
          price: 24.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Lobster Bisque',
          description: 'Creamy lobster soup with cognac and crème fraîche',
          price: 18.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Wagyu Beef Steak',
          description: 'Premium Wagyu beef steak with red wine reduction',
          price: 39.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Rack of Lamb',
          description: 'Herb-crusted rack of lamb with rosemary jus',
          price: 34.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'Truffle Risotto',
          description: 'Creamy risotto with black truffle and parmesan',
          price: 26.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Pan-Seared Scallops',
          description: 'Fresh scallops with cauliflower puree and truffle oil',
          price: 28.99,
          category: 'Seafood',
          image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Grilled Lobster',
          description: 'Grilled lobster tail with herb butter and seasonal vegetables',
          price: 42.99,
          category: 'Seafood',
          image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Chilean Sea Bass',
          description: 'Pan-seared sea bass with lemon beurre blanc',
          price: 36.99,
          category: 'Seafood',
          image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Crème Brûlée',
          description: 'Classic French dessert with caramelized sugar crust',
          price: 12.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Chocolate Soufflé',
          description: 'Warm chocolate soufflé with vanilla ice cream',
          price: 14.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Fruit Tart',
          description: 'Seasonal fruit tart with pastry cream',
          price: 11.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
      ],
    },
    
    // Seafood menu
    seafood: {
      _id: `menu-${restaurantId}`,
      name: 'Seafood Menu',
      categories: ['Starters', 'Main Course', 'Sides', 'Desserts'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'Prawn Cocktail',
          description: 'Chilled prawns with cocktail sauce and lemon',
          price: 12.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Calamari Rings',
          description: 'Crispy fried calamari with garlic aioli',
          price: 10.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Fish Soup',
          description: 'Traditional fish soup with mixed seafood and herbs',
          price: 9.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Grilled Pomfret',
          description: 'Whole pomfret grilled with herbs and spices',
          price: 18.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Prawn Curry',
          description: 'Spicy prawn curry with coconut milk',
          price: 16.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 2
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'Fish and Chips',
          description: 'Battered fish fillets with crispy fries and tartar sauce',
          price: 14.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Garlic Bread',
          description: 'Toasted bread with garlic butter',
          price: 4.99,
          category: 'Sides',
          image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24427f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Steamed Rice',
          description: 'Plain steamed basmati rice',
          price: 3.99,
          category: 'Sides',
          image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Garden Salad',
          description: 'Fresh mixed greens with vinaigrette',
          price: 5.99,
          category: 'Sides',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Key Lime Pie',
          description: 'Tangy lime pie with graham cracker crust',
          price: 6.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Coconut Pudding',
          description: 'Creamy coconut pudding with caramel sauce',
          price: 5.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Ice Cream Sundae',
          description: 'Vanilla ice cream with chocolate sauce and nuts',
          price: 4.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
      ],
    },
    
    // Thai/Vietnamese menu
    thai_vietnamese: {
      _id: `menu-${restaurantId}`,
      name: 'Thai & Vietnamese Menu',
      categories: ['Appetizers', 'Soups', 'Main Course', 'Desserts'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'Spring Rolls',
          description: 'Fresh rice paper rolls with vegetables, herbs, and shrimp',
          price: 7.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Satay Skewers',
          description: 'Grilled chicken skewers with peanut sauce',
          price: 8.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Som Tam',
          description: 'Spicy green papaya salad with lime, chili, and peanuts',
          price: 9.99,
          category: 'Appetizers',
          image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 3
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Tom Yum Soup',
          description: 'Hot and sour soup with lemongrass, galangal, and shrimp',
          price: 8.99,
          category: 'Soups',
          image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 2
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Pho',
          description: 'Vietnamese noodle soup with beef and herbs',
          price: 10.99,
          category: 'Soups',
          image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'Tom Kha Gai',
          description: 'Coconut soup with chicken, galangal, and lime',
          price: 9.99,
          category: 'Soups',
          image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 1
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Pad Thai',
          description: 'Stir-fried rice noodles with eggs, tofu, bean sprouts, and peanuts',
          price: 12.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 1
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Green Curry',
          description: 'Spicy Thai curry with coconut milk, vegetables, and chicken',
          price: 13.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          spicyLevel: 3
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Bun Cha',
          description: 'Vietnamese grilled pork with rice noodles and herbs',
          price: 14.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Mango Sticky Rice',
          description: 'Sweet sticky rice with fresh mango and coconut cream',
          price: 6.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Coconut Ice Cream',
          description: 'Homemade coconut ice cream with peanuts',
          price: 5.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Banana in Coconut Milk',
          description: 'Sliced banana in warm coconut milk with tapioca pearls',
          price: 5.49,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1511124076533-20395e192f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
      ],
    },
    
    // Default menu for other restaurants
    default: {
      _id: `menu-${restaurantId}`,
      name: 'Main Menu',
      categories: ['Starters', 'Main Course', 'Desserts', 'Beverages'],
      items: [
        {
          _id: `item1-${restaurantId}`,
          name: 'House Special Appetizer',
          description: 'Chef\'s special appetizer of the day',
          price: 9.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item2-${restaurantId}`,
          name: 'Vegetable Spring Rolls',
          description: 'Crispy spring rolls filled with vegetables',
          price: 7.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true
        },
        {
          _id: `item3-${restaurantId}`,
          name: 'Chicken Wings',
          description: 'Crispy chicken wings with your choice of sauce',
          price: 10.99,
          category: 'Starters',
          image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item4-${restaurantId}`,
          name: 'Signature Main Course',
          description: 'Restaurant\'s signature dish with seasonal ingredients',
          price: 16.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item5-${restaurantId}`,
          name: 'Grilled Chicken',
          description: 'Herb-marinated grilled chicken with vegetables',
          price: 14.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          _id: `item6-${restaurantId}`,
          name: 'Vegetable Curry',
          description: 'Mixed vegetables in a flavorful curry sauce',
          price: 12.99,
          category: 'Main Course',
          image: 'https://images.unsplash.com/photo-1631292784640-2b24be784d1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
          spicyLevel: 1
        },
        {
          _id: `item7-${restaurantId}`,
          name: 'Chocolate Cake',
          description: 'Rich chocolate cake with ganache',
          price: 6.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item8-${restaurantId}`,
          name: 'Fruit Salad',
          description: 'Fresh seasonal fruits with honey',
          price: 5.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item9-${restaurantId}`,
          name: 'Ice Cream',
          description: 'Choice of vanilla, chocolate, or strawberry',
          price: 4.99,
          category: 'Desserts',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item10-${restaurantId}`,
          name: 'Soft Drinks',
          description: 'Assorted soft drinks',
          price: 2.99,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item11-${restaurantId}`,
          name: 'Fresh Juice',
          description: 'Freshly squeezed seasonal fruit juice',
          price: 4.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
        {
          _id: `item12-${restaurantId}`,
          name: 'Coffee',
          description: 'Freshly brewed coffee',
          price: 3.49,
          category: 'Beverages',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          isVegetarian: true,
        },
      ],
    }
  };
  
  // Return the appropriate menu based on restaurant type
  return menus[menuType];
};

export default getRestaurantMenu;