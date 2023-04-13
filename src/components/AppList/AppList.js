import React from 'react';

const AppList = ({ apps, onInstall }) => {
  return (
    <div>
      <h1>Available Apps</h1>
      <ul>
        {apps.map((app) => (
          <li key={app.id}>
            <div>
              <h3>{app.name}</h3>
              <p>{app.description}</p>
              <button onClick={() => onInstall(app.id)}>Install</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppList;
