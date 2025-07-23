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

  const placeOrder = (cartItems, restaurant, total, deliveryAddress) => {
    const newOrder = {
      id: 'order_' + Date.now(),
      items: cartItems,
      restaurant,
      total,
      status: 'placed',
      createdAt: new Date().toISOString(),
      deliveryAddress,
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes from now
      statusUpdates: [
        {
          status: 'placed',
          timestamp: new Date().toISOString(),
          message: 'Order placed successfully'
        }
      ]
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, status, message) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
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