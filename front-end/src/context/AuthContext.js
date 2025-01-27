import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    id: null,
    name: '',
    role: ''
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Log the token before making the request
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (token) {
          const response = await axios.get('http://localhost:4000/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAuthState({
            isAuthenticated: true,
            id: response.data.id,
            name: response.data.name,
            role: response.data.role
          });

          console.log('Auth state updated:', {
            isAuthenticated: true,
            id: response.data.id,
            name: response.data.name,
            role: response.data.role
          });
        } else {
          console.log('No token found in localStorage');
        }
      } catch (error) {
        console.log('Error verifying token:', error);
        setAuthState({
          isAuthenticated: false,
          id: null,
          name: '',
          role: ''
        });
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
