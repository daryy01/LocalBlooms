// src/pages/landing/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
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
    </div>
  );
};

export default LandingPage;
