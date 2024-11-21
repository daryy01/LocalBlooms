import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaStar } from 'react-icons/fa';
import { products, flowerAddOns, sellers } from '../../services/dataService';

function SellerShop() {
  const { sellerId } = useParams();
  const sellerProducts = products[sellerId] || [];
  const coreAddOns = flowerAddOns.coreAddOns;
  const sellerAddOnsList = flowerAddOns.sellerAddOns[sellerId] || [];
  const { cart, addToCart, removeFromCart } = useCart();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
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

  const isLoggedIn = Boolean(localStorage.getItem('authToken'));

  const handleAddToCart = (product) => {
    if (!isLoggedIn) return;
    const productWithSeller = { ...product, sellerId: parseInt(sellerId) };
    addToCart(productWithSeller);
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
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">{sellers[sellerId - 1].name}</h1>

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
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
              
            </div>
          </div>
        ))}
      </div>

      {/* Add-Ons Section */}
      <h2 className="text-2xl font-bold text-pink-600 mt-10 mb-6">Add-Ons</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...coreAddOns, ...sellerAddOnsList].map((addon) => (
          <div key={addon.id} className="text-center">
            <img src={addon.image} alt={addon.name} className="w-24 h-24 object-contain mx-auto mb-2" />
            <p className="font-semibold text-gray-700">{addon.name}</p>
            <p className="text-gray-600">₱{addon.price}</p>
            <button
              onClick={() => addToCart(addon)}
              disabled={!isLoggedIn}
              className={`mt-2 py-1 px-4 rounded-lg shadow-md transition ${
                isLoggedIn
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-pink-600">Reviews</h3>
        <div className="my-4">
          {submittedReviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            submittedReviews.map((review, index) => (
              <div key={index} className="border-t border-gray-300 pt-4">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-500" />
                  <p className="text-lg text-pink-700">{review.rating} Stars</p>
                </div>
                <p className="mt-2 text-gray-600">{review.reviewText}</p>
                <p className="text-sm text-gray-500 mt-2">{review.date}</p>
              </div>
            ))
          )}
        </div>
        {isLoggedIn && (
          <div className="mt-6">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave a review"
              className="w-full p-4 border-2 border-pink-300 rounded-lg mb-4"
            />
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`cursor-pointer text-xl ${index < (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  onMouseEnter={() => setHover(index + 1)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
            <button
              onClick={handleSubmitReview}
              className="mt-4 py-2 px-6 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerShop;
