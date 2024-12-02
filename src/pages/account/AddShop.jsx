import React, { useState } from 'react';
import { addShop } from '../../services/dataService';  
import { useNavigate } from 'react-router-dom';

const AddShop = () => {
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([{ name: '', price: '', image: '' }]);  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!shopName || !description || !location || !image) {
      setError('Please fill all required fields.');
      setIsLoading(false);
      return;
    }

    const newShop = {
      name: shopName,
      description,
      location,
      image: URL.createObjectURL(image),  
    };

    const validProducts = products.filter(product => product.name && product.price && product.image); 
    addShop(newShop, validProducts);

    setShopName('');
    setDescription('');
    setLocation('');
    setImage(null);
    setProducts([{ name: '', price: '', image: '' }]); 
    setIsLoading(false);

   
    navigate('/shops');  
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', price: '', image: '' }]);  
  };

  const handleProductImageChange = (index, e) => {
    const file = e.target.files[0];
    const newProducts = [...products];
    newProducts[index].image = URL.createObjectURL(file);  
    setProducts(newProducts);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">Add a New Flower Shop</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xl font-medium text-gray-700">Shop Name</label>
          <input 
            type="text" 
            value={shopName} 
            onChange={(e) => setShopName(e.target.value)} 
            required 
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your flower shop's name"
          />
        </div>

        <div>
          <label className="block text-xl font-medium text-gray-700">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Describe your flower shop's offerings"
          />
        </div>

        <div>
          <label className="block text-xl font-medium text-gray-700">Location</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter your shop's location"
          />
        </div>

        <div>
          <label className="block text-xl font-medium text-gray-700">Shop Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            required 
            className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Product Form Section */}
        <div>
          <h3 className="text-2xl font-semibold text-pink-600 mt-8">Products</h3>
          {products.map((product, index) => (
            <div key={index} className="space-y-4 p-4 bg-gray-50 border rounded-md mt-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={product.name} 
                  onChange={(e) => handleProductChange(index, e)} 
                  required 
                  className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Price</label>
                <input 
                  type="number" 
                  name="price" 
                  value={product.price} 
                  onChange={(e) => handleProductChange(index, e)} 
                  required 
                  className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter product price"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Product Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleProductImageChange(index, e)} 
                  required 
                  className="w-full p-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>
          ))}
          <button 
            type="button" 
            onClick={handleAddProduct} 
            className="mt-4 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700"
          >
            Add Another Product
          </button>
        </div>

        <div className="mt-8">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            {isLoading ? 'Adding Shop...' : 'Add Flower Shop'}
          </button>
        </div>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default AddShop;
