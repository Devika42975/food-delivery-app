import React, { useState, useEffect } from 'react';
import { getRestaurantImage, validateImageUrl } from '../utils/imageUtils';

const RestaurantImage = ({ restaurant, className }) => {
  const [imageError, setImageError] = useState(false);
  
  // State to store the final image source
  const [imageSource, setImageSource] = useState('');
  
  // Use effect to handle image loading and fallbacks
  useEffect(() => {
    // Function to preload image and check if it loads correctly
    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error('Image failed to load'));
      });
    };
    
    const loadImage = async () => {
      try {
        // If we already have an error or no images, use fallback immediately
        if (imageError || !restaurant.images || restaurant.images.length === 0) {
          setImageSource(getRestaurantImage(restaurant.cuisine, restaurant._id));
          return;
        }
        
        // Try to load the restaurant image
        const validUrl = validateImageUrl(restaurant.images[0]);
        await preloadImage(validUrl);
        setImageSource(validUrl);
      } catch (error) {
        // If loading fails, use fallback image based on cuisine
        console.log(`Image failed to load for ${restaurant.name}, using fallback`);
        setImageSource(getRestaurantImage(restaurant.cuisine, restaurant._id));
      }
    };
    
    loadImage();
  }, [restaurant, imageError]);

  return (
    <>
      {imageSource ? (
        <img
          src={imageSource}
          alt={restaurant.name}
          className={className || ''}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="image-placeholder" style={{ backgroundColor: '#f0f0f0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>{restaurant.name[0]}</span>
        </div>
      )}
    </>
  );
};

export default RestaurantImage;