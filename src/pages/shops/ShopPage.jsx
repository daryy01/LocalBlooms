import React from 'react';
import { Link } from 'react-router-dom';

const sellers = [
  { id: 1, name: 'Lala Flower Shop', description: 'Flowers for all occasions', image: './fs1.jpg' },
  { id: 2, name: 'PD BloomUp', description: 'Handmade flower arrangements', image: './fs2.jpg' },
  { id: 3, name: 'Plait Na', description: 'Death Annual Arrangements', image: './fs3.jpg' },
];

function ShopPage() {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-pink-50 to-purple-50">
      <h1 className="text-4xl font-extrabold text-center text-pink-700 mb-10">Shop by Sellers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sellers.map((seller) => (
          <Link
          key={seller.id}
          to={`/shop/${seller.id}`}
          className="relative bg-white border-2 border-pink-300 rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition duration-300"
        >
          {/* Shop Image */}
          <div
            className="w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${seller.image})` }}
          />
          
          {/* Seller Info: Name and Description with Background */}
          <div className="p-6 bg-white bg-opacity-80 space-y-4">
            <h2 className="text-2xl font-semibold text-pink-700">{seller.name}</h2>
            <p className="text-gray-600 text-base">{seller.description}</p>
          </div>
        
          {/* Visit Shop Button */}
          <div className="absolute bottom-0 left-0 right-0 bg-pink-600 py-4 text-center">
            <span className="text-white font-semibold hover:text-pink-200 transition duration-300">
              Visit Shop
            </span>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
