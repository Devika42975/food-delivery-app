import React, { useState, useEffect } from 'react';
import { getRestaurantImage } from '../utils/imageUtils';

const RestaurantImage = ({ restaurant, className }) => {
  const [imageSource, setImageSource] = useState('');
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Reset error state when restaurant changes
    setHasError(false);
    
    // Determine image source
    if (restaurant.images && restaurant.images.length > 0 && restaurant.images[0] && !hasError) {
      setImageSource(restaurant.images[0]);
    } else {
      // Use cuisine-based fallback
      setImageSource(getRestaurantImage(restaurant.cuisine, restaurant._id));
    }
  }, [restaurant, hasError]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSource(getRestaurantImage(restaurant.cuisine, restaurant._id));
    }
  };

  return (
    <img
      src={imageSource}
      alt={restaurant.name}
      className={className || ''}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default RestaurantImage;