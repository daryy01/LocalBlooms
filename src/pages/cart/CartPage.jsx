import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, getTotalPrice, clearCart, checkout } = useCart();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set user data
    } else {
      setError('User not found. Please log in.');
      navigate('/login'); // Redirect to login if no user data found
    }
  }, [navigate]);

  const handleCheckout = () => {
    if (!user) return;

    const newOrder = checkout(user.id); // Save the order to user's history
    alert('Order placed successfully for pickup!');

    navigate('/account'); // Redirect to the account page
  };

  const handleRemoveFromCart = (productId, sellerId) => {
    removeFromCart(productId, sellerId);
  };

  // Function to clear all items from the cart
  const handleClearCart = () => {
    clearCart(); // This function should be implemented in your context to clear the cart
    alert('All items have been removed from the cart.');
  };

  return (
    <div className="container mx-auto p-8">
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
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
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
                onClick={handleClearCart} // Call the function to clear the cart
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              >
                Remove All Items
              </button>
              <button
                onClick={() => {
                  checkout();
                  alert('Order placed successfully!');
                  navigate('/orders'); // Navigate to the orders page after checkout
                }}
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
