import React from 'react';

const UserAppList = ({ installedApps }) => {
  return (
    <div>
      <h1>Your Installed Apps</h1>
      <ul>
        {installedApps.map((app) => (
          <li key={app.id}>
            <div>
              <h3>{app.name}</h3>
              <p>{app.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAppList;
