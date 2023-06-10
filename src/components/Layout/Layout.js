import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logout successful');
        // Navigate to the login page after successful logout
        navigate('/login');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <header className="hub-nabled-header">
        <h1>Hub Nabled</h1>
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
