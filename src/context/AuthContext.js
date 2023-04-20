import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      // Perform other actions, like updating the state, redirecting to another page, etc.
      console.log('Successfully went through!!!');
    } else {
      throw new Error('Login failed');
    }
  };

  const register = async (email, password) => {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      // Perform other actions, like updating the state, redirecting to another page, etc.
      console.log('Successfully went through!!!');
    } else {
      throw new Error('Registration failed');
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
    <AuthContext.Provider value={{ user, login, register, installApp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
