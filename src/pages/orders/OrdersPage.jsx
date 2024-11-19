import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; // Assuming you have setOrders available here
import { FaStar } from 'react-icons/fa';

function OrdersPage() {
  const { orders, setOrders } = useCart(); // Assuming `setOrders` is available for updating the orders
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelMessage, setCancelMessage] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelOrder = (orderId) => {
    if (!cancelReason.trim()) {
      setCancelMessage('Please provide a reason for cancellation.');
      return;
    }

    // Set loading state
    setIsCancelling(true);
    setCancelMessage('Cancelling order...');

    // Simulate cancellation process with a timeout
    setTimeout(() => {
      // Here, you can replace the logic with an actual API call to cancel the order.
      const updatedOrders = orders.filter((order) => order.id !== orderId);

      // Update orders state in context (this will trigger a re-render)
      setOrders(updatedOrders);

      // Update cancellation message
      setCancelMessage('Order canceled successfully!');
      setIsCancelling(false);
      setCancelReason(''); // Reset the cancel reason input
    }, 1000);
  };

  const handleReviewSubmit = (order) => {
    if (!review.trim() || rating === 0) return;
    // Assuming `order.shopId` identifies the shop linked to the order
    const newReview = {
      orderId: order.id,
      shopId: order.shopId,
      reviewText: review.trim(),
      rating,
      date: new Date().toLocaleString(),
    };
    console.log('Review submitted:', newReview); // Replace with actual backend/API integration
    setReview('');
    setRating(0);
    setSelectedOrder(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">Order #{order.id}</h2>
              <p className="text-gray-500">Date: {order.date}</p>
              <ul className="mt-2 space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x ₱{item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold">Total: ₱{order.total.toFixed(2)}</p>

              {/* Cancel Order Section */}
              <button
                className="mt-4 text-red-500 underline"
                onClick={() => setSelectedOrder(order.id)}
                disabled={isCancelling}
              >
                {isCancelling ? 'Canceling...' : 'Cancel Order'}
              </button>
              {selectedOrder === order.id && (
                <div className="mt-4">
                  <textarea
                    placeholder="Why are you cancelling this order?"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                  ></textarea>
                  <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={isCancelling}
                  >
                    {isCancelling ? 'Processing...' : 'Confirm Cancellation'}
                  </button>
                </div>
              )}

              {/* Cancellation Status Message */}
              {cancelMessage && (
                <p
                  className={`mt-2 text-sm ${
                    cancelMessage.includes('success') ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {cancelMessage}
                </p>
              )}

              {/* Review Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Leave a Review</h3>
                <textarea
                  placeholder="Write your review here..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                ></textarea>
                <div className="flex items-center mt-2">
                  <span className="mr-2 text-sm font-semibold">Rating:</span>
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name={`rating-${order.id}`}
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          className="hidden"
                        />
                        <FaStar
                          className={`cursor-pointer transition ${
                            ratingValue <= (hover || rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          size={20}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(0)}
                        />
                      </label>
                    );
                  })}
                </div>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleReviewSubmit(order)}
                  disabled={!review.trim() || rating === 0}
                >
                  Submit Review
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
}

export default OrdersPage;
