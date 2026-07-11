import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Call your API
    const user = { id: '123', email, name: 'User' }; // Mock response
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signup = async (userData) => {
    // Call your API
    const user = { id: '123', email: userData.email, name: `${userData.firstName} ${userData.lastName}` };
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};