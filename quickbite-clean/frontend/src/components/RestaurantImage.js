import React, { useState, useEffect } from 'react';
import { getRestaurantImage } from '../utils/imageUtils';

const RestaurantImage = ({ restaurant, className }) => {
  const [imageSource, setImageSource] = useState('');
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    setHasError(false);
    
    // Always use fallback image based on cuisine to ensure consistency
    const fallbackImage = getRestaurantImage(restaurant.cuisine, restaurant._id);
    
    if (restaurant.images && restaurant.images.length > 0 && restaurant.images[0] && !hasError) {
      setImageSource(restaurant.images[0]);
    } else {
      setImageSource(fallbackImage);
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
      src={imageSource || getRestaurantImage(restaurant.cuisine, restaurant._id)}
      alt={restaurant.name}
      className={className || ''}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default RestaurantImage;