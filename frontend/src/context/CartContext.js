import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], restaurant: null };
  });
  
  const [total, setTotal] = useState(0);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate total
    const cartTotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(cartTotal);
  }, [cart]);

  // Add item to cart
  const addToCart = (item, restaurant) => {
    // Check if item is from a different restaurant
    if (cart.restaurant && cart.restaurant._id !== restaurant._id) {
      if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
      // Clear cart if confirmed
      setCart({ items: [], restaurant: null });
    }

    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.items.find((i) => i._id === item._id);

      if (existingItem) {
        // Update quantity if item exists
        return {
          ...prevCart,
          items: prevCart.items.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        // Add new item with quantity 1
        return {
          restaurant,
          items: [...prevCart.items, { ...item, quantity: 1 }],
        };
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item._id !== itemId);
      
      // If cart is empty, reset restaurant as well
      if (updatedItems.length === 0) {
        return { items: [], restaurant: null };
      }
      
      return {
        ...prevCart,
        items: updatedItems,
      };
    });
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;

    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      ),
    }));
  };

  // Clear cart
  const clearCart = () => {
    setCart({ items: [], restaurant: null });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};