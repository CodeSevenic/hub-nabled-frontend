import React from 'react';
import { Outlet } from 'react-router-dom';

import './Layout.css';

const Layout = () => {
  return (
    <div>
      <header className="hub-nabled-header">
        <h1>Hub Nabled</h1>
        {/* Other elements for your header here */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
