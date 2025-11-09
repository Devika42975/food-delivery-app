import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('quickbite:favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('quickbite:favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (restaurantId) => {
    return favorites.some(fav => fav._id === restaurantId);
  };

  const toggleFavorite = (restaurant) => {
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.some(fav => fav._id === restaurant._id);
      
      if (isCurrentlyFavorite) {
        // Remove from favorites
        return prev.filter(fav => fav._id !== restaurant._id);
      } else {
        // Add to favorites
        return [...prev, {
          _id: restaurant._id,
          name: restaurant.name,
          cuisine: restaurant.cuisine,
          rating: restaurant.rating,
          priceRange: restaurant.priceRange,
          image: restaurant.image || restaurant.images?.[0],
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;