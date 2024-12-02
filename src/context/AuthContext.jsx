import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Store logged-in user details, including token and user information
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Check if a user is logged in based on `user` state
  const isLoggedIn = !!user;

  // Login function to set user data and token
  const login = (token, userDetails) => {
    const userData = { ...userDetails, token }; // Combine token and user details
    localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
    setUser(userData); // Update state
  };

  // Logout function to clear user data and reset state
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Synchronize user state with localStorage to persist sessions
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
