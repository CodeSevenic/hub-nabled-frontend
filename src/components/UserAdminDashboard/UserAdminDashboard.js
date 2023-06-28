import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contacts from '../Contacts/Contacts';
import './UserDashboard.css';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

const UserDashboard = () => {
  const [apps, setApps] = useState([]);

  // Fetch apps from backend
  const fetchApps = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/apps');
      setApps(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const installApp = (app) => {
    console.log('App: ', app);
    const userId = sessionStorage.getItem('userId');
    const redirectUri = 'http://localhost:4000/api/install';
    const url = `${redirectUri}?app_id=${app.appId}&userId=${userId}&appName=${app.appName}`;

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
        // if (window.oauthWindow) {
        //   window.oauthWindow.postMessage({ command: 'close' }, 'http://localhost:3000'); // target origin
        // }

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
    <div className="user-dashboard-wrapper">
      <div className="user-dashboard">
        <h2 className="user-dashboard-title">Available Apps</h2>
        <ul className="user-dashboard-list">
          {apps.map((app) => {
            return (
              <li key={app.appId} className="user-dashboard-list-item">
                <p>{app.appName}</p>
                <button className="user-dashboard-install-btn" onClick={() => installApp(app)}>
                  Install
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Contacts />
      <FeatureToggle
        featureName={'contacts'}
        userId={'1686304441140-ef932950-6d4e-467e-a60c-909434a97378'}
      />
    </div>
  );
};

export default UserDashboard;
