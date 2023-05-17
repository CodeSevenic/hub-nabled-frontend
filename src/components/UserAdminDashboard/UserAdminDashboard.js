// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css'; // Importing the CSS file

const UserDashboard = () => {
  const [apps, setApps] = useState([]);

  // Fetch apps from backend
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get('http://localhost:4000/apps');
        setApps(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="user-dashboard">
      <h2 className="user-dashboard-title">Available Apps</h2>
      <ul className="user-dashboard-list">
        {apps.map((app) => (
          <li key={app.id} className="user-dashboard-list-item">
            <p>{app.appName}</p>
            <button
              className="user-dashboard-install-btn"
              onClick={() => alert('Implement installation process')}
            >
              Install
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
