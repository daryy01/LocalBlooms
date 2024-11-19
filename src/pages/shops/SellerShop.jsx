import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// Mock products by seller with paths to local images in the public folder
const products = {
  1: [
    { id: 1, name: 'Rose Bouquet', price: 15, image: '/roseb.jpg' },
    { id: 2, name: 'Tulip Arrangement', price: 20, image: '/tulipa.jpg' },
  ],
  2: [
    { id: 1, name: 'Handmade Wreath', price: 25, image: '/handw.jpg' },
    { id: 2, name: 'Custom Floral Basket', price: 30, image: '/customflo.jpg' },
  ],
  3: [
    { id: 1, name: 'Lily Bouquet', price: 18, image: '/lilyb.jpg' },
    { id: 2, name: 'Daisy Arrangement', price: 22, image: '/daisa.jpg' },
  ],
};

function SellerShop() {
  const { sellerId } = useParams();  // Get the sellerId from the URL
  const sellerProducts = products[sellerId] || [];
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    // Add sellerId to the product when adding it to the cart
    const productWithSeller = { ...product, sellerId: parseInt(sellerId) };
    addToCart(productWithSeller);
  };

  return (
    <div className="container mx-auto p-6 bg-pink-50">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Welcome to the Flower Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sellerProducts.map((product) => (
          <div
            key={product.id}
            className="border-2 border-pink-300 p-6 rounded-lg shadow-lg bg-white hover:bg-pink-100 transition duration-300"
            style={{ backgroundImage: "url('https://source.unsplash.com/200x200/?floral-pattern')", backgroundSize: 'cover' }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-pink-700">{product.name}</h2>
            <p className="text-lg text-gray-700 mt-2">Price: ${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-pink-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-pink-400 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerShop;
