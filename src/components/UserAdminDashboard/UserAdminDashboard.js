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
    const userId = sessionStorage.getItem('userId');
    const redirectUri = 'http://localhost:4000/api/install';
    const url = `${redirectUri}?app_id=${app.id}&userId=${userId}`;

    // Store the window reference
    window.oauthWindow = window.open(
      url,
      'OAuthWindow',
      'height=600,width=800,location=yes,scrollbars=yes'
    );
  };

  useEffect(() => {
    fetchApps();

    const handleStorageChange = () => {
      if (localStorage.getItem('oauth_complete') === 'true') {
        fetchApps();

        // Send a message to the OAuth window to close itself
        if (window.oauthWindow) {
          window.oauthWindow.postMessage({ command: 'close' }, 'http://localhost:3000'); // target origin
        }

        localStorage.removeItem('oauth_complete');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    console.log('window.addEventListener happened on UserDashboard.js');

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
