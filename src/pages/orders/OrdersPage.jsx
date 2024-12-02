import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaStar } from 'react-icons/fa';

function OrdersPage() {
  const { orders, setOrders, addReview } = useCart();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [pickedUpOrders, setPickedUpOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotificationMessage = (message) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCancelOrder = (orderId) => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation.');
      return;
    }

    setIsCancelling(true);

    const updatedOrders = orders.filter((order) => order.id !== orderId);

    setOrders(updatedOrders);

    setCancelReason('');
    setIsCancelling(false);
    setSelectedOrder(null);

    showNotificationMessage('Order cancelled successfully!');
  };

  const handlePickupOrder = (orderId) => {
    setPickedUpOrders((prev) => [...prev, orderId]);
    showNotificationMessage('Order marked as picked up successfully!');
  };

  const handleReviewSubmit = (order) => {
    if (!review.trim() || rating === 0) return;

    addReview(order.id, order.shopId, review.trim(), rating);

    setOrderHistory((prevHistory) => [...prevHistory, { ...order, review, rating }]);

    const updatedOrders = orders.filter((o) => o.id !== order.id);
    setOrders(updatedOrders);

    setReview('');
    setRating(0);
    setSelectedOrder(null);

    showNotificationMessage('Review submitted successfully!');
  };

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  const sortedOrderHistory = [...orderHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-4">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50">
          {notification}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {sortedOrders.length > 0 ? (
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">Order #{order.id}</h2>
              <p className="text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>

              <p className="text-gray-700 mt-2">
                <strong>Shop Name:</strong> {order.shopName || 'Shop not available'}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Pickup Location:</strong>
                {order.shopLocation || 'Location not available'}
              </p>

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

              <button
                className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
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

              {!pickedUpOrders.includes(order.id) && (
                <button
                  className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                  onClick={() => handlePickupOrder(order.id)}
                >
                  Mark as Pickup Successfully
                </button>
              )}

              {pickedUpOrders.includes(order.id) && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Leave a Review for {order.shopName}</h3>
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
                              ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
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
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>You have no active orders.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Order History</h2>
      {sortedOrderHistory.length > 0 ? (
        <div className="space-y-4">
          {sortedOrderHistory.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold">Order #{order.id}</h2>
              <p className="text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>

              <p className="text-gray-700 mt-2">
                <strong>Shop Name:</strong> {order.shopName || 'Shop not available'}
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Pickup Location:</strong>
                {order.shopLocation || 'Location not available'}
              </p>

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

              <div className="mt-4">
                <p><strong>Review:</strong> {order.review}</p>
                <p><strong>Rating:</strong> {order.rating} / 5</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No completed orders yet.</p>
      )}
    </div>
  );
}

export default OrdersPage;
