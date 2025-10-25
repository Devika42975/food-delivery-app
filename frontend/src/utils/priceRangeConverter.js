// Function to convert all price ranges from $ to ₹
export const convertPriceRanges = (restaurants) => {
  return restaurants.map(restaurant => {
    const priceRange = restaurant.priceRange.replace(/\$/g, '₹');
    return {
      ...restaurant,
      priceRange
    };
  });
};

export default convertPriceRanges;