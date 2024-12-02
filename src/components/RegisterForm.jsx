import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });

      setSuccess('Registration successful!');
      setName('');
      setEmail('');
      setPassword('');

      // Redirect to the login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setError(error.response?.data || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto"
      style={{ backgroundImage: "url('/images/floral-background.jpg')", backgroundSize: 'cover' }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-700">Register on LocalBlooms</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
          placeholder="Enter your name"
          required
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
          placeholder="Enter your email"
          required
          disabled={loading}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
          placeholder="Enter your password"
          required
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded-lg font-bold hover:bg-pink-600"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <p className="text-center text-sm mt-4 text-gray-700">
        Already have an account?{' '}
        <Link to="/login" className="text-pink-500 hover:text-pink-600">
          Log in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
