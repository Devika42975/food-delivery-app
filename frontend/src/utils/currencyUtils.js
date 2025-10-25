// Currency utility functions

/**
 * Convert price range symbols to rupee ranges
 * @param {string} priceRange - Price range in dollar format (e.g., '$', '$$', '$$$')
 * @returns {string} Price range in rupee format (e.g., '₹', '₹₹', '₹₹₹')
 */
export const convertPriceRangeToRupees = (priceRange) => {
  if (!priceRange) return '';
  return priceRange.replace(/\$/g, '₹');
};

/**
 * Format price in rupees
 * @param {number} price - Price in dollars
 * @returns {string} Formatted price in rupees
 */
export const formatPriceInRupees = (price) => {
  if (typeof price !== 'number') return '₹0';
  // Convert dollar price to rupees (approximate conversion rate)
  const rupeePrice = price * 75;
  return `₹${rupeePrice.toFixed(0)}`;
};

/**
 * Convert price from dollars to rupees
 * @param {number} dollarPrice - Price in dollars
 * @returns {number} Price in rupees
 */
export const convertToRupees = (dollarPrice) => {
  if (typeof dollarPrice !== 'number') return 0;
  return dollarPrice * 75;
};

export default {
  convertPriceRangeToRupees,
  formatPriceInRupees,
  convertToRupees
};