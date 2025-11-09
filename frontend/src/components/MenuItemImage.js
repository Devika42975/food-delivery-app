import React, { useState } from 'react';

const MenuItemImage = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  
  // Enhanced category-specific food images with multiple options
  const categoryImages = {
    'Appetizers': [
      'https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Starters': [
      'https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Main Course': [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Pizza': [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Pasta': [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Desserts': [
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Beverages': [
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Sushi': [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ],
    'Noodles': [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    ]
  };
  
  // Get the appropriate image source
  const getImageSource = () => {
    if (imageError || !item.image) {
      // Get images for the category
      const images = categoryImages[item.category] || categoryImages['Main Course'];
      // Use item ID to select a consistent image
      const hash = item._id ? item._id.charCodeAt(item._id.length - 1) || 0 : 0;
      const index = hash % images.length;
      return images[index];
    }
    return item.image;
  };

  return (
    <img
      src={getImageSource()}
      alt={item.name}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
};

export default MenuItemImage;