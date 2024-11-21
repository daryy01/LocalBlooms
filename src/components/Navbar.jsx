import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { cart } = useCart();
  const cartCount = cart.length; 
  const navigate = useNavigate();

  // Effect to check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setIsLoggedIn(true);
      const userData = JSON.parse(loggedInUser); // Assuming the user data is stored as a stringified object
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUserName("");
    navigate('/login'); // Optional: Navigate to login page after logout
  };

  return (
    <header className="bg-white shadow-md px-4 py-3">
      <nav className="flex justify-between items-center container mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-pink-600">LocalBlooms</h1>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden sm:flex items-center gap-6 text-gray-600">
          <Link to="/" className="flex items-center gap-2 hover:text-pink-700 transition-all">
            <FaHome /> Home
          </Link>
          <Link to="/shops" className="flex items-center gap-2 hover:text-pink-700 transition-all">
            <CiShop /> Shops
          </Link>
          <Link to="/cart" className="flex items-center gap-2 hover:text-pink-700 relative">
            <FaShoppingCart /> Shopping Cart
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/account" className="flex items-center gap-2 hover:text-pink-700 transition-all">
            <FaUser /> Account
          </Link>

          {/* Conditional rendering for Login/Register or User Info */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-pink-600">Welcome, {userName}!</span>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-transparent border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-100 transition-all">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center">
          <button className="text-gray-800 focus:outline-none text-2xl">
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
