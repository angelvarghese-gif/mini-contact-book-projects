import React, { createContext, useState, useEffect } from 'react';
import api from './api';

// Create the authentication context share wrapper
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a login session token already exists when the website first loads up
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  // Login handler: Authenticates credentials against Django and stores tokens
  const login = async (username, password) => {
    const response = await api.post('token/', { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    setUser({ authenticated: true });
  };

  // Logout handler: Wipes tracking credentials from the local storage cache
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
