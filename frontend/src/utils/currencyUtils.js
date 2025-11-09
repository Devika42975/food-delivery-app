// Currency utility functions

/**
 * Convert price range symbols to readable labels
 * @param {string} priceRange - Price range in dollar format (e.g., '$', '$$', '$$$')
 * @returns {string} Price range as readable text (e.g., 'Affordable', 'Mid-range', 'Premium')
 */
export const convertPriceRangeToRupees = (priceRange) => {
  const conversion = {
    '$': 'Affordable',
    '$$': 'Mid-range',
    '$$$': 'Premium',
    '$$$$': 'Luxury'
  };
  return conversion[priceRange] || 'Mid-range';
};

/**
 * Format price with rupee symbol for menu items
 * @param {number} price - Price in dollars
 * @returns {string} Formatted price with rupee symbol
 */
export const formatPriceInRupees = (price) => {
  if (typeof price !== 'number') return '₹0';
  // Convert dollar price to rupees with fair pricing
  const rupeePrice = price * 15;
  return `₹${rupeePrice.toFixed(0)}`;
};

/**
 * Convert price from dollars to rupees
 * @param {number} dollarPrice - Price in dollars
 * @returns {number} Price in rupees
 */
export const convertToRupees = (dollarPrice) => {
  if (typeof dollarPrice !== 'number') return 0;
  return dollarPrice * 15;
};

export default {
  convertPriceRangeToRupees,
  formatPriceInRupees,
  convertToRupees
};