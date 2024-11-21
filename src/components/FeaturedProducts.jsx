import React, { useState } from 'react';
import { sellers, products } from '../services/dataService'; 

const FeaturedProducts = () => {
  const [currentSellerId, setCurrentSellerId] = useState(1); // Default to the first seller
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  // Get products for the selected seller
  const sellerProducts = products[currentSellerId] || [];

  const nextProducts = () => {
    setCurrentIndex((prevIndex) => {
      // Move forward by 1 product, wrap around if at the end
      return (prevIndex + 1) % sellerProducts.length;
    });
  };

  const prevProducts = () => {
    setCurrentIndex((prevIndex) => {
      // Move backward by 1 product, wrap around if at the start
      return (prevIndex - 1 + sellerProducts.length) % sellerProducts.length;
    });
  };

  // Get the next set of products to display
  const displayedProducts = sellerProducts.slice(currentIndex, currentIndex + itemsToShow);
  if (displayedProducts.length < itemsToShow) {
    displayedProducts.push(...sellerProducts.slice(0, itemsToShow - displayedProducts.length));
  }

  return (
    <section className="container mx-auto py-16 bg-green-50">
      <h2 className="text-4xl font-serif text-center text-pink-600 mb-8">Featured Floral Arrangements</h2>
      <div className="relative">
        {/* Seller Navigation */}
        <div className="flex justify-center mb-6">
          {sellers.map((seller) => (
            <button
              key={seller.id}
              onClick={() => setCurrentSellerId(seller.id)}
              className={`px-6 py-3 mx-3 rounded-full ${currentSellerId === seller.id ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-600'}`}
            >
              {seller.name}
            </button>
          ))}
        </div>

        {/* Displaying products for selected seller */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-xl p-6 border-2 border-pink-200">
             <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain rounded-t-lg" // Use object-contain to make sure the image fits within its container without being cropped
              />
              <h3 className="text-2xl font-serif text-pink-600 mt-4">{product.name}</h3>
              <p className="text-gray-700 text-lg my-2">₱{product.price.toLocaleString()}</p>
            {/*<button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
                Add to Cart
              </button>*/}
            </div>
          ))}
        </div>

        {/* Navigation Arrows for Products 
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-6">
          <button
            onClick={prevProducts}
            className="text-white bg-pink-600 bg-opacity-50 p-3 rounded-full"
          >
            &#10094;
          </button>
          <button
            onClick={nextProducts}
            className="text-white bg-pink-600 bg-opacity-50 p-3 rounded-full"
          >
            &#10095;
          </button>
        </div>*/}
      </div>
    </section>
  );
};

export default FeaturedProducts;
