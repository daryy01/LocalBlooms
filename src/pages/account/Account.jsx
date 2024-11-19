import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShopify, FaSignOutAlt } from 'react-icons/fa'; // Icons for a more professional look

const Account = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddShop = () => {
    navigate('/add-shop');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-pink-700 text-white w-64 p-6">
        <div className="text-3xl font-semibold text-center mb-8">
          <FaUserCircle />
        </div>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/account')}
            className="w-full text-left py-2 px-4 text-lg font-semibold hover:bg-pink-600 rounded-md"
          >
            Profile
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="w-full text-left py-2 px-4 text-lg font-semibold hover:bg-pink-600 rounded-md"
          >
            Orders
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="w-full text-left py-2 px-4 text-lg font-semibold hover:bg-pink-600 rounded-md"
          >
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center text-pink-700">My Account</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h3>
            <p className="text-lg text-gray-600">
              <strong>Name:</strong> John Doe
            </p>
            <p className="text-lg text-gray-600">
              <strong>Email:</strong> john.doe@example.com
            </p>
           
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Account Settings</h3>
            <button
              onClick={handleAddShop}
              className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 mb-4"
            >
              Add Your Shop
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleLogout}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 flex items-center justify-center gap-2"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
