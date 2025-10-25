import React, { useState } from 'react';

const MenuItemImage = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  
  // Category-specific food images
  const categoryImages = {
    'Appetizers': 'https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Main Course': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  };
  
  // Get the appropriate image source
  const getImageSource = () => {
    if (imageError || !item.image) {
      // Use a unique image based on item ID and category
      return categoryImages[item.category] || 
        `https://images.unsplash.com/photo-${1550000000000 + parseInt(item._id.replace(/\D/g, '') || '1')}?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`;
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