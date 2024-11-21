import React from 'react';
import FeaturedProducts from '../../components/FeaturedProducts.jsx'; 
import Testimonials from '../../components/Testimonials.jsx'; 
import ContactUs from '../../components/ContactUs.jsx'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
<section
  className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
  style={{ backgroundImage: "url('flobg1.jpg')" }}
>
  <div className="text-center text-white p-6 bg-gradient-to-b from-transparent to-black/50">
    <h1 className="text-pink-600 text-5xl font-extrabold">Fresh Flowers, Ready for Pickup</h1>
    <p className="text-white text-lg mt-4 max-w-lg mx-auto">
      Your one-stop site for beautiful blooms. Handpicked arrangements for any occasion.
    </p>
    <div className="mt-6 space-x-4">
      <Link to="/shops">
        <button className="bg-pink-800 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
          Shop Now
        </button>
      </Link>
      <Link to="/account">
        <button className="bg-white hover:bg-pink-800 hover:text-white text-pink-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
          My Account
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* Featured Products */}
      <FeaturedProducts />

    {/* About Us */}
<section className="container mx-auto py-16 px-4 bg-pink-100">
  <h2 className="text-4xl font-bold text-center mb-8 text-pink-800">About Us</h2>
  <div className="flex flex-col md:flex-row items-center">
    {/* Image of Florist's Arrangement */}
    <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
      <img 
        src="florist1.jpg" 
        alt="Florists showcasing their floral arrangements" 
        className="rounded-lg shadow-lg w-full max-w-md object-cover"
      />
    </div>

    {/* Text Content */}
    <div className="md:w-1/2 md:pl-10">
      <p className="text-lg text-gray-700 mb-4 text-center md:text-left">
        At LocalBlooms, we believe that flowers have the power to brighten any moment. Our platform brings together talented local florists, each with their own creative touch, offering you beautiful, handcrafted arrangements that suit every occasion.
      </p>
      <p className="text-lg text-gray-700 mb-4 text-center md:text-left">
        Whether you're celebrating a wedding, an anniversary, or simply want to send a thoughtful gift, LocalBlooms connects you with florists who craft stunning, unique floral designs. Our mission is to make it easy for you to find the perfect flowers, no matter the occasion.
      </p>
      <p className="text-lg text-gray-700 text-center md:text-left">
        Explore our community of florists, discover their beautiful floral creations, and support local artisans. At LocalBlooms, we are passionate about flowers, and we’re here to make your flower-shopping experience as delightful as the blooms themselves.
      </p>
    </div>
  </div>
</section>



      {/* Customer Testimonials */}
      <Testimonials />

      {/* Contact Information */}
      <ContactUs />

      {/* Footer */}
<footer className="bg-pink-800 text-white py-6">
  <div className="text-center">
    <p className="text-lg">&copy; 2023 LocalBlooms Flower Shop</p>
    <ul className="flex justify-center gap-6 mt-4">
      <li>
        <a href="#" className="text-white hover:text-pink-300">About Us</a>
      </li>
      <li>
        <a href="#" className="text-white hover:text-pink-300">Contact Us</a>
      </li>
      <li>
        <a href="#" className="text-white hover:text-pink-300">Privacy Policy</a>
      </li>
    </ul>
    <div className="flex justify-center gap-6 mt-6">
      {/* Social Media Icons */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>
      <a href="#" className="text-3xl text-white hover:text-pink-300">
        <i className="fab fa-facebook-square"></i>
      </a>
      <a href="#" className="text-3xl text-white hover:text-pink-300">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" className="text-3xl text-white hover:text-pink-300">
        <i className="fab fa-twitter"></i>
      </a>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;
