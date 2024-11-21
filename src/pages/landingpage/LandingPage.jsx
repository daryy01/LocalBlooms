import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sellers, products } from '../../services/dataService';

const LandingPage = () => {
  const [topRatedShops, setTopRatedShops] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [featuredShop, setFeaturedShop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home');
    }

    // Load content dynamically
    fetchTopRatedShops();
    fetchBestSellers();
    setFeaturedShop(sellers[0]); // Assume the first seller is featured
  }, [navigate]);

  const fetchTopRatedShops = () => {
    setTopRatedShops(sellers.slice(0, 3)); // Top 3 shops from sellers
  };

  const fetchBestSellers = () => {
    const allProducts = Object.values(products).flat();
    setBestSellers(allProducts.slice(0, 4)); // Get first 4 best-selling products
  };

  const handleExploreShop = (shopId) => {
    navigate(`/shops/${shopId}`); // Navigate to the specific shop page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/flobg1.jpg')" }}
      >
        <div className="text-center text-white bg-opacity-60 bg-black p-8 rounded-lg">
          <h1 className="text-5xl font-bold">Welcome to LocalBlooms</h1>
          <p className="text-lg mt-4">
            Freshly-picked blooms for every occasion, straight from your favorite local florists.
          </p>
          <Link to="/login">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded mt-6">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Top Rated Flower Shops Section */}
      <section className="py-12 bg-pink-50">
        <h2 className="text-4xl font-semibold text-center text-pink-700">Top Rated Flower Shops</h2>
        <div className="mt-8 flex justify-center space-x-8">
          {topRatedShops.map((shop) => (
            <div
              key={shop.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-pink-800">{shop.name}</h3>
              <p className="text-gray-600 mt-2">{shop.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Seller Flowers Section */}
      <section className="py-12 bg-white">
        <h2 className="text-4xl font-semibold text-center text-pink-700">Best Seller Flowers</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-pink-50 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold text-pink-800 mt-4">{product.name}</h3>
              <p className="text-gray-600 mt-2">Price: ₱{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Advertisement Section */}
      {featuredShop && (
        <section className="py-12 bg-pink-100">
          <h2 className="text-4xl font-semibold text-center text-pink-700">Featured Advertisement</h2>
          <div className="mt-8 flex justify-center">
            <div className="p-8 bg-pink-50 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <img
                src={featuredShop.image}
                alt={featuredShop.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold text-pink-800">{featuredShop.name}</h3>
              <p className="text-gray-600 mt-4">{featuredShop.description}</p>
              <button
                onClick={() => handleExploreShop(featuredShop.id)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-6"
              >
                Explore Now
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingPage;
