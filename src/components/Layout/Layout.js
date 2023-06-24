import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import './Layout.css';
import { AuthContext } from '../../context/AuthContext';

const Layout = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Logout successful');
        sessionStorage.clear();
        setIsLoggedIn(false);
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const username = sessionStorage.getItem('username');

  return (
    <div>
      <header className="hub-nabled-header">
        <h1>Hi, {username}</h1>
        {/* Other elements for your header here */}
        <button onClick={handleLogout} className="hbn-logout-btn">
          Logout
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
