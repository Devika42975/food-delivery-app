import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user if token exists (using mock data instead of API call)
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        // Use mock user data instead of API call
        setUser({
          _id: 'user123',
          name: 'Demo User',
          email: 'user@example.com',
          role: 'user'
        });
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user (mock implementation)
  const register = async (userData) => {
    try {
      // Mock successful registration
      const mockToken = 'mock-token-' + Date.now();
      const mockUser = {
        _id: 'user' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'user'
      };
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Registration failed',
      };
    }
  };

  // Login user (mock implementation)
  const login = async (email, password) => {
    try {
      // Mock successful login
      // In a real app, you would validate credentials
      const mockToken = 'mock-token-' + Date.now();
      const mockUser = {
        _id: 'user123',
        name: 'Demo User',
        email: email,
        role: 'user'
      };
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Invalid credentials',
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Update user profile (mock implementation)
  const updateProfile = async (userData) => {
    try {
      // Mock successful profile update
      setUser(prev => ({
        ...prev,
        ...userData
      }));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Update failed',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};