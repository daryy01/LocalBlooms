import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaStar } from 'react-icons/fa';

// Updated product prices and currency to Philippine Peso (₱)
const products = {
  1: [
    { id: 1, name: 'Rose Bouquet', price: 750, image: '/roseb.jpg' },
    { id: 2, name: 'Tulip Arrangement', price: 1200, image: '/tulipa.jpg' },
  ],
  2: [
    { id: 1, name: 'Handmade Wreath', price: 1500, image: '/handw.jpg' },
    { id: 2, name: 'Custom Floral Basket', price: 1800, image: '/customflo.jpg' },
  ],
  3: [
    { id: 1, name: 'Lily Bouquet', price: 900, image: '/lilyb.jpg' },
    { id: 2, name: 'Daisy Arrangement', price: 1100, image: '/daisa.jpg' },
  ],
};

function SellerShop() {
  const { sellerId } = useParams(); // Get the sellerId from the URL
  const sellerProducts = products[sellerId] || [];
  const { cart, addToCart, removeFromCart } = useCart();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0); // State for star rating
  const [hover, setHover] = useState(0); // State for hover effect on stars
  const [submittedReviews, setSubmittedReviews] = useState([]);

  // Load existing reviews from localStorage
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${sellerId}`)) || [];
    setSubmittedReviews(storedReviews);
  }, [sellerId]);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`reviews_${sellerId}`, JSON.stringify(submittedReviews));
  }, [submittedReviews, sellerId]);

  // Check if the user is logged in (e.g., token exists in localStorage)
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));

  const handleAddToCart = (product) => {
    if (!isLoggedIn) return;
    const productWithSeller = { ...product, sellerId: parseInt(sellerId) };
    addToCart(productWithSeller);
  };

  const handleRemoveFromCart = (productId) => {
    if (!isLoggedIn) return;
    removeFromCart(productId, parseInt(sellerId));
  };

  const handleSubmitReview = () => {
    if (!review.trim() || rating === 0) return;
    const newReview = {
      sellerId: parseInt(sellerId),
      reviewText: review.trim(),
      rating,
      date: new Date().toLocaleString(),
    };
    setSubmittedReviews((prevReviews) => [...prevReviews, newReview]);
    setReview('');
    setRating(0);
  };

  return (
    <div className="container mx-auto p-6 bg-pink-50">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Welcome to the Flower Shop</h1>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sellerProducts.map((product) => (
          <div
            key={product.id}
            className="border-2 border-pink-300 p-6 rounded-lg shadow-lg bg-white hover:bg-pink-100 transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-pink-700">{product.name}</h2>
            <p className="text-lg text-gray-700 mt-2">Price: ₱{product.price}</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!isLoggedIn}
                className={`py-2 px-6 rounded-lg shadow-md transition ${
                  isLoggedIn
                    ? 'bg-pink-500 text-white hover:bg-pink-400'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title={!isLoggedIn ? 'Please log in to add items to your cart' : ''}
              >
                {isLoggedIn ? 'Add to Cart' : 'Log in to Add'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Section */}
      <div className="mt-12 p-6 bg-white border-2 border-pink-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Write a Review</h2>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience with this shop..."
          className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4"
          rows="4"
        ></textarea>
        
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          <span className="mr-2 text-lg font-semibold text-gray-700">Rating:</span>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className={`cursor-pointer transition-colors duration-200 ${
                    ratingValue <= (hover || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        <button
          onClick={handleSubmitReview}
          className="py-2 px-6 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-400 transition"
          disabled={!isLoggedIn || !review.trim() || rating === 0}
        >
          Submit Review
        </button>

        {/* Display Submitted Reviews */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Reviews:</h3>
          {submittedReviews.length > 0 ? (
            <ul className="space-y-4">
              {submittedReviews.map((rev, index) => (
                <li
                  key={index}
                  className="p-4 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50"
                >
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((star, i) => (
                      <FaStar
                        key={i}
                        className={`mr-1 ${
                          i < rev.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        size={20}
                      />
                    ))}
                  </div>
                  <p>{rev.reviewText}</p>
                  <p className="text-sm text-gray-500 mt-2">Date: {rev.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerShop;
