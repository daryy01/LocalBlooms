import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddShop = () => {
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([{ name: '', image: null }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Getting the token from local storage (or any other source)
  const token = localStorage.getItem('token'); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleProductChange = (index, event) => {
    const updatedProducts = [...products];
    updatedProducts[index][event.target.name] = event.target.value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', image: null }]);
  };

  const handleProductImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedProducts = [...products];
      updatedProducts[index].image = file;
      setProducts(updatedProducts);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!shopName || !description || !location || !image) {
      setError('Please fill all required fields.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('shopName', shopName);
    formData.append('shopDescription', description);
    formData.append('shopLocation', location);
    formData.append('shopImage', image);

    products.forEach((product, index) => {
      formData.append(`productName[${index}]`, product.name);
      if (product.image) {
        formData.append(`productImage[${index}]`, product.image);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/add-shop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setError(''); // Reset error on success
        navigate('/account');
      } else {
        setError('Error adding shop. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setError('Error adding shop. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-pink-600">Add Your Floral Shop</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white bg-opacity-90 p-6 rounded-lg">
        
        {error && <div className="bg-red-500 text-white p-2 rounded-md mb-4">{error}</div>}

        <div className="space-y-2">
          <label className="block text-lg text-gray-700">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg text-gray-700">Shop Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg text-gray-700">Shop Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg text-gray-700">Shop Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-pink-600">Products</h3>
          {products.map((product, index) => (
            <div key={index} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-lg text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, e)}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg text-gray-700">Product Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleProductImageChange(index, e)}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddProduct}
            className="w-full bg-pink-500 text-white p-3 rounded-md mt-4 hover:bg-pink-600 transition duration-200"
          >
            Add Another Product
          </button>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Shop'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShop;
