import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, getTotalPrice, clearCart, checkout } = useCart();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setError('User not found. Please log in.');
      navigate('/login');
    }
  }, [navigate]);

  const handleCheckout = () => {
    if (!user) return;

    checkout(user.id);

    setNotification('Your order has been successfully placed for pickup!');
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      navigate('/account');
    }, 3000);
  };

  const handleRemoveFromCart = (productId, sellerId) => {
    removeFromCart(productId, sellerId);
  };

  const handleClearCart = () => {
    clearCart();
    setNotification('All items have been removed from the cart.');
    setShowNotification(true);

    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="container mx-auto p-8 relative">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50">
          {notification}
        </div>
      )}

      <h1 className="text-3xl font-semibold text-center text-pink-700 mb-8">Your Shopping Cart</h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl font-medium text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((product) => (
              <div
                key={`${product.id}-${product.sellerId}`}
                className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-lg text-gray-600 mt-2">Price: ₱{product.price}</p>
                <p className="text-sm text-gray-500 mt-2">Quantity: {product.quantity}</p>

                <button
                  onClick={() => handleRemoveFromCart(product.id, product.sellerId)}
                  className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
                >
                  <FaTrashAlt />
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-2xl font-semibold text-gray-800">Total: ₱{getTotalPrice()}</p>

            <div className="space-x-4">
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              >
                Remove All Items
              </button>
              <button
                onClick={handleCheckout}
                className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
