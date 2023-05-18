import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.isAdmin) {
        setIsAdmin(true);
      }
      setIsLoggedIn(true);
      setUser(data.user);
      // Perform other actions, like updating the state, redirecting to another page, etc.
      console.log('Login: Successfully went through!!!');
      sessionStorage.setItem('userId', data.userId);
      return data.userId;
    } else {
      throw new Error('Login failed');
    }
  };

  const register = async (email, password) => {
    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      // Perform other actions, like updating the state, redirecting to another page, etc.
      console.log('Register: Successfully went through!!!');
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  };

  const installApp = async (appId) => {
    const response = await fetch('http://localhost:8000/api/install', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId }),
    });

    if (!response.ok) {
      throw new Error('App installation failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, installApp, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
