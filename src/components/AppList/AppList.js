import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AppList = ({ apps }) => {
  const { installApp } = useContext(AuthContext);

  const handleInstall = async (appId) => {
    try {
      await installApp(appId);
    } catch (error) {
      console.error('App installation failed:', error);
    }
  };
  return (
    <div className="appList">
      <h1>Available Apps</h1>
      <ul>
        {apps.map((app) => (
          <li key={app.id}>
            <div>
              <h3>{app.name}</h3>
              <p>{app.description}</p>
              <button onClick={() => handleInstall(app.id)}>Install</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppList;
