// Preload common restaurant images to improve user experience
import { restaurantImages } from './imageUtils';

export const preloadImages = () => {
  // Flatten the image arrays into a single array
  const imagesToPreload = Object.values(restaurantImages)
    .flat()
    .slice(0, 10); // Limit to first 10 images to avoid excessive preloading
  
  // Create image objects to preload
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

export default preloadImages;