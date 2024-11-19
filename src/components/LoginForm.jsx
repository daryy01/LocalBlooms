import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setSuccess(true);
      setTimeout(() => {
        navigate('/home');  // Redirect after successful login
      }, 2000);  // Wait for 2 seconds before redirect

    } catch (error) {
      setError(error.response?.data || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto" style={{ backgroundImage: "url('/images/floral-background.jpg')", backgroundSize: 'cover' }}>
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-700">Login to LocalBlooms</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">Login successful! Redirecting...</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-pink-200"
          placeholder="Enter your email"
          required
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
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded-lg font-bold hover:bg-pink-600"
        disabled={loading}
      >
        {loading ? 'Logging In...' : 'Log In'}
      </button>

      <p className="text-center text-sm mt-4 text-gray-700">
        Don’t have an account?{' '}
        <Link to="/register" className="text-pink-500 hover:text-pink-600">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
