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

  const oauthCallBackUrl = 'http://localhost:4000/api/oauth-callback';

  const installApp = (app) => {
    const scopes = app.scopes.split(/ |, ?|%20/).join(' ');
    const url =
      'https://app.hubspot.com/oauth/authorize' +
      `?client_id=${encodeURIComponent(app.clientId)}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(oauthCallBackUrl)}`;
    window.open(url, 'OAuthWindow', 'height=600,width=800,location=yes,scrollbars=yes');
  };

  return (
    <div className="user-dashboard">
      <h2 className="user-dashboard-title">Available Apps</h2>
      <ul className="user-dashboard-list">
        {apps.map((app) => {
          console.log('clientID: ', app.clientId);
          console.log('Scopes: ', app.scopes);
          console.log('Secret: ', app.clientSecret);
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
