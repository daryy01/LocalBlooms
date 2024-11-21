import React from 'react';

const ContactUs = () => {
  return (
    <section className="container mx-auto py-16 px-4 bg-pink-50">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-800">Contact Us</h2>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <p className="text-lg text-gray-700">Address: Ampayon Butuan City</p>
          <p className="text-lg text-gray-700">Phone: (123) 456-7890</p>
          <p className="text-lg text-gray-700">Email: localbloom@flowershop.com</p>
        </div>
        <form className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg border-2 border-pink-300">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <textarea
            placeholder="Message"
            className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          ></textarea>
          <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
