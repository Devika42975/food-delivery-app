// Function to convert all price ranges from $ to readable labels
export const convertPriceRanges = (restaurants) => {
  const conversion = {
    '$': 'Affordable',
    '$$': 'Mid-range',
    '$$$': 'Premium',
    '$$$$': 'Luxury'
  };
  
  return restaurants.map(restaurant => {
    const priceRange = conversion[restaurant.priceRange] || 'Mid-range';
    return {
      ...restaurant,
      priceRange
    };
  });
};

export default convertPriceRanges;