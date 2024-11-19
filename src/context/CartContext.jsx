import React, { createContext, useContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider to provide the cart state and actions to the app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on initial render
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product already exists in the cart (same productId and sellerId)
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.sellerId === product.sellerId
      );

      if (existingProduct) {
        // If the product exists, increase its quantity
        return prevCart.map((item) =>
          item.id === product.id && item.sellerId === product.sellerId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product doesn't exist, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (productId, sellerId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.sellerId === sellerId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      // Remove product if quantity is 0
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Checkout: Save cart as a new order and clear the cart
  const checkout = () => {
    const newOrder = {
      id: Date.now(), // Unique order ID
      items: cart,
      total: getTotalPrice(),
      date: new Date().toLocaleString(),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order to state
    clearCart(); // Clear the cart after checkout
  };

  // Get total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
