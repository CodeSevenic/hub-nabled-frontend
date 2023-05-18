import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const [apps, setApps] = useState([]);

  // Fetch apps from backend
  const fetchApps = async () => {
    try {
      const response = await axios.get('http://localhost:4000/apps');
      setApps(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const installApp = (app) => {
    const redirectUri = 'http://localhost:4000/api/install';
    const url = `${redirectUri}` + `?app_id=${app.id}`;
    window.open(url, 'OAuthWindow', 'height=600,width=800,location=yes,scrollbars=yes');
  };

  useEffect(() => {
    fetchApps();

    const handleStorageChange = () => {
      if (localStorage.getItem('oauth_complete') === 'true') {
        // OAuth process is complete, refresh state
        fetchApps();

        // Clear the LocalStorage value
        localStorage.removeItem('oauth_complete');
      }
    };

    // Listen for changes to LocalStorage
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="user-dashboard">
      <h2 className="user-dashboard-title">Available Apps</h2>
      <ul className="user-dashboard-list">
        {apps.map((app) => {
          return (
            <li key={app.id} className="user-dashboard-list-item">
              <p>{app.appName}</p>
              <button className="user-dashboard-install-btn" onClick={() => installApp(app)}>
                Install
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserDashboard;
