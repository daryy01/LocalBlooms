import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { cart } = useCart();
  const cartCount = cart.length; 

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <header className="px-4 bg-white shadow-md">
      <nav className="flex justify-between items-center container mx-auto md:py-4 pt-6 pb-3">
        
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">LocalBlooms</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-6 text-gray-600">
          <Link to="/" className="flex items-center gap-2 hover:text-pink-700">
            <FaHome /> Home
          </Link>
          <Link to="/shops" className="flex items-center gap-2 hover:text-pink-700">
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
          <Link to="/account" className="flex items-center gap-2 hover:text-pink-700">
            <FaUser /> Account
          </Link>

          {/* Conditional rendering for Login/Register or User Info */}
          {isLoggedIn ? (
            <>
              <span className="text-gray-800">Hello, {userName}</span>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-400">
                Log In
              </Link>
              <Link to="/register" className="px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-400">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center">
          <button className="text-gray-800 focus:outline-none">
            ☰
          </button>
        </div>
      </nav>
      <hr />
    </header>
  );
}

export default Navbar;
