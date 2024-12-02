import React, { createContext, useContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider to provide the cart state, orders, and reviews to the app
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [orders, setOrders] = useState(() => {
    // Load orders from localStorage on initial render
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });
  const [reviews, setReviews] = useState(() => {
    // Load reviews from localStorage on initial render
    const storedReviews = localStorage.getItem('reviews');
    return storedReviews ? JSON.parse(storedReviews) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  // CartContext.js (Update addReview method and add a function to get reviews by seller)
  const addReview = (orderId, shopId, reviewText, rating) => {
    const newReview = {
      orderId,
      reviewText,
      rating,
      date: new Date().toLocaleString(),
    };
  
    setReviews((prevReviews) => {
      const updatedReviews = { ...prevReviews };
      if (!updatedReviews[shopId]) updatedReviews[shopId] = [];  // Initialize the shop's review array if it doesn't exist
      updatedReviews[shopId].push(newReview);
      return updatedReviews;
    });
  
    // Save reviews by sellerId in localStorage
    const sellerReviewsKey = `reviews_${shopId}`;
    const storedReviews = JSON.parse(localStorage.getItem(sellerReviewsKey)) || [];
    localStorage.setItem(sellerReviewsKey, JSON.stringify([...storedReviews, newReview]));
  };
  
  const getReviewsBySeller = (sellerId) => {
    const sellerReviewsKey = `reviews_${sellerId}`;
    return JSON.parse(localStorage.getItem(sellerReviewsKey)) || [];
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
      getReviewsBySeller,
    }}
  >
    {children}
  </CartContext.Provider>
);
}

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
