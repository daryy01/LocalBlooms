import React, { createContext, useContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider to provide the cart state, orders, and reviews to the app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Load orders and reviews from localStorage on initial render
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  // Save orders and reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [orders, reviews]);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.sellerId === product.sellerId
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && item.sellerId === product.sellerId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
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
      id: Date.now(),
      items: cart,
      total: getTotalPrice(),
      date: new Date().toLocaleString(),
      shopLocation: "Sample Shop Location", 
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    clearCart();
  };

  // Get total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Add a review for an order
  const addReview = (orderId, shopId, reviewText, rating) => {
    const newReview = {
      orderId,
      shopId,
      reviewText,
      rating,
      date: new Date().toLocaleString(),
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        setOrders, 
        reviews, 
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        getTotalPrice,
        addReview, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
