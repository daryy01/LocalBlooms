import React, { useState } from 'react';

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 29.99, image: '/samp1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 39.99, image: '/samp22.jpg' },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 49.99, image: '/samp3.jpg' },
    { id: 4, name: 'Product 4', description: 'Description 4', price: 59.99, image: '/samp4.jpg' },
    { id: 5, name: 'Product 5', description: 'Description 5', price: 69.99, image: '/samp5.jpg' },
    { id: 6, name: 'Product 6', description: 'Description 6', price: 79.99, image: '/samp6.jpg' }
  ];

  const itemsToShow = 3;

  const nextProducts = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % products.length);
  };

  const prevProducts = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsToShow + products.length) % products.length);
  };

  // Get the next set of products to display
  const displayedProducts = products.slice(currentIndex, currentIndex + itemsToShow);
  if (displayedProducts.length < itemsToShow) {
    displayedProducts.push(...products.slice(0, itemsToShow - displayedProducts.length));
  }

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="relative">
        {/* Displaying products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain rounded-t-lg"
              />
              <h3 className="text-xl font-bold mt-4">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-2xl font-bold mt-4">${product.price}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevProducts}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={nextProducts}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
