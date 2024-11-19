import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [topRatedShops, setTopRatedShops] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [featuredShops, setFeaturedShops] = useState([]);
  const navigate = useNavigate();

  // Simulated fetch calls (replace with actual API calls)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home');
    }

    // Fetch dynamic content
    fetchTopRatedShops();
    fetchBestSellers();
    fetchPromotions();
    fetchFeaturedShops();
  }, [navigate]);

  const fetchTopRatedShops = () => {
    // Simulate fetching top-rated shops
    setTopRatedShops([
      { name: 'Bloom & Co.', rating: 4.9 },
      { name: 'Floral Fantasy', rating: 4.8 },
      { name: 'Petals and Stems', rating: 4.7 },
    ]);
  };

  const fetchBestSellers = () => {
    // Simulate fetching best-selling flowers
    setBestSellers([
      { name: 'Rose Bouquet', image: '/rb.jpg' },
      { name: 'Tulip Delight', image: '/tb.jpg' },
      { name: 'Lilies of Love', image: '/lb.jpg' },
    ]);
  };

  const fetchPromotions = () => {
    // Simulate fetching promotions
    setPromotions([
      { title: 'Spring Sale - 20% Off', discount: '20%' },
      { title: 'Buy One, Get One Free on Select Flowers', discount: 'BOGO' },
    ]);
  };

  const fetchFeaturedShops = () => {
    // Simulate fetching featured shops
    setFeaturedShops([
      { name: 'Petals & Blooms', specialOffer: 'Free Delivery on Orders Over $50' },
      { name: 'Flower Haven', specialOffer: '10% Off for First-Time Buyers' },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section
        className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('flobg1.jpg')" }}
      >
        <div className="text-center text-black">
          <h1 className="text-mediumcarmine text-5xl font-bold">Fresh Flowers, Delivered Daily</h1>
          <p className="text-birch text-lg mt-4">Your one-stop shop for beautiful blooms.</p>
          <Link to="/login">
            <button className="bg-pink-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Log In / Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Top Rated Shops Section */}
      <section className="py-10 bg-pink-100">
        <h2 className="text-3xl font-semibold text-center text-pink-600">Top Rated Flower Shops</h2>
        <div className="flex justify-center space-x-4 mt-6">
          {topRatedShops.map((shop, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-pink-800">{shop.name}</h3>
              <p className="text-gray-500">Rating: {shop.rating} / 5</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Seller Flowers Section */}
      <section className="py-10 bg-white">
        <h2 className="text-3xl font-semibold text-center text-pink-600">Best Seller Flowers</h2>
        <div className="flex justify-center space-x-4 mt-6">
          {bestSellers.map((flower, index) => (
            <div key={index} className="text-center p-4 bg-white shadow-lg rounded-lg">
              <img src={flower.image} alt={flower.name} className="w-48 h-48 object-cover rounded-md mx-auto" />
              <h3 className="text-xl font-bold text-pink-800 mt-4">{flower.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-10 bg-pink-200">
        <h2 className="text-3xl font-semibold text-center text-pink-600">Current Promotions</h2>
        <div className="flex justify-center space-x-4 mt-6">
          {promotions.map((promo, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg w-64 text-center">
              <h3 className="text-xl font-bold text-pink-800">{promo.title}</h3>
              <p className="text-lg text-gray-500">Save {promo.discount}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Flower Shops Section */}
      <section className="py-10 bg-white">
        <h2 className="text-3xl font-semibold text-center text-pink-600">Featured Flower Shops</h2>
        <div className="flex justify-center space-x-4 mt-6">
          {featuredShops.map((shop, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg w-64 text-center">
              <h3 className="text-xl font-bold text-pink-800">{shop.name}</h3>
              <p className="text-gray-500">{shop.specialOffer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
