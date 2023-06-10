import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.isAdmin) {
        setIsAdmin(true);
      }
      setIsLoggedIn(true);
      // Perform other actions, like updating the state, redirecting to another page, etc.
      console.log('Login: Successfully went through!!!');
      console.log('Login: ', data);

      sessionStorage.setItem('userId', data.userId);
      sessionStorage.setItem('isAdmin', data.isAdmin);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('isLoggedIn', data.isLoggedIn);

      return data.userId;
    } else {
      throw new Error('Login failed');
    }
  };

  const register = async (username, email, password) => {
    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json();
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
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId }),
    });

    if (!response.ok) {
      throw new Error('App installation failed');
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, installApp, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
