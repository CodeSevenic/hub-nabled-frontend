// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [apps, setApps] = useState([]);

  // Fetch apps from backend
  useEffect(() => {
    const fetchApps = async () => {
      try {
        // const response = await axios.get('http://localhost:3001/apps');
        setApps(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="UserDashboard">
      <h2>Available Apps</h2>
      <ul>
        {apps.map((app) => (
          <li key={app.id}>
            {app.appId}{' '}
            <button onClick={() => alert('Implement installation process')}>Install</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
