import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (cartItems, restaurant, totalInRupees, deliveryAddress) => {
    // Calculate correct totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity * 15), 0);
    const deliveryFee = 20;
    const tax = subtotal * 0.05;
    const finalTotal = subtotal + deliveryFee + tax;
    
    const newOrder = {
      _id: 'order_' + Date.now(),
      id: 'order_' + Date.now(),
      items: cartItems.map(item => ({
        ...item,
        priceInRupees: item.price * 15
      })),
      restaurant,
      total: finalTotal,
      subtotal,
      deliveryFee,
      tax,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryAddress,
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
      statusUpdates: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          message: 'Order placed successfully'
        }
      ]
    };
    
    // Simulate realistic order progression
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'preparing', 'Restaurant is preparing your order');
    }, 2 * 60 * 1000); // 2 minutes
    
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'out_for_delivery', 'Your order is out for delivery');
    }, 5 * 60 * 1000); // 5 minutes
    
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'delivered', 'Order delivered successfully');
    }, 15 * 60 * 1000); // 15 minutes

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, status, message) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId || order._id === orderId) {
          return {
            ...order,
            status,
            statusUpdates: [
              ...order.statusUpdates,
              {
                status,
                timestamp: new Date().toISOString(),
                message
              }
            ]
          };
        }
        return order;
      })
    );
  };

  const addReview = (orderId, itemId, rating, comment) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.map(item => {
              if (item._id === itemId) {
                return {
                  ...item,
                  review: {
                    rating,
                    comment,
                    createdAt: new Date().toISOString()
                  }
                };
              }
              return item;
            })
          };
        }
        return order;
      })
    );
  };

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getOrdersByRestaurant = (restaurantId) => {
    return orders.filter(order => order.restaurant._id === restaurantId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        addReview,
        getOrder,
        getOrdersByRestaurant
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};