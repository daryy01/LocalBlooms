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
        className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center" style={{ backgroundImage: "url('flobg1.jpg')" }}>
        <div className="text-center text-black">
          <h1 className="text-mediumcarmine text-5xl font-bold">Fresh Flowers, Delivered Daily</h1>
          <p className="text-birch text-lg mt-4">Your one-stop shop for beautiful blooms.</p>
          <Link to="/shops">
            <button className="bg-pink-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Shop Now
            </button>
          </Link>
          {/* Add Account Link */}
          <Link to="/account">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              My Account
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Us */}
      <section className="container mx-auto py-16 px-4 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">About Us</h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Placeholder */}
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img 
              src="florist1.jpg" 
              alt="Florists showcasing their arrangements" 
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>

          {/* Text Content */}
          <div className="md:w-1/2 md:pl-10">
            <p className="text-lg text-gray-700 mb-4 text-center md:text-left">
              LocalBlooms is an online platform connecting you with talented local florists. We empower flower shops to showcase their unique arrangements and products, making it easy for customers to explore and purchase directly from multiple vendors.
            </p>
            <p className="text-lg text-gray-700 mb-4 text-center md:text-left">
              Whether you're looking for a bouquet for a special occasion or something simple to brighten your day, LocalBlooms brings together diverse floral styles and creations from shops near you, all in one place.
            </p>
            <p className="text-lg text-gray-700 text-center md:text-left">
              Browse our community of florists, discover their handcrafted arrangements, and support local businesses. At LocalBlooms, we make it easy for you to find the perfect flowers for any moment.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Contact Information */}
      <ContactUs />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="text-center">
          <p>&copy; 2023 Your Flower Shop</p>
          <ul className="flex justify-center gap-4">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
          <div className="flex justify-center gap-6 mt-4">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>
            <a href="#" className="text-3xl text-white"><i className="fab fa-facebook-square"></i></a>
            <a href="#" className="text-3xl text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-3xl text-white"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
