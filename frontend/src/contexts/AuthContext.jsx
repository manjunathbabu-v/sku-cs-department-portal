import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data && response.data.success) {
        const userDetails = response.data.user;

        setUser(userDetails);
        sessionStorage.setItem('user', JSON.stringify(userDetails));

        return true;
      }

      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, data);

      console.log("Register response:", response.data);

      if (response.status === 200 || response.status === 201) {
        return true;
      }

      return false;
    } catch (err) {
      console.error('Register error:', err);

      if (err.response && err.response.data) {
        console.error("Backend message:", err.response.data);
      }

      return false;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};