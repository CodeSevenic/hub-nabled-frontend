import React, { useEffect, useRef, useState } from 'react';
import AuthPage from './pages/Auth/AuthPage';
import AppList from './components/AppList/AppList';
import UserAppList from './components/UserAppList/UserAppList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [installedApps, setInstalledApps] = useState([]);

  useEffect(() => {
    // Keep the #root container full height
    function setRootHeight() {
      const root = document.getElementById('root');
      if (root) {
        const windowHeight = window.innerHeight;
        root.style.height = `${windowHeight}px`;
      }
    }

    setRootHeight();

    window.addEventListener('resize', setRootHeight);

    return () => {
      window.removeEventListener('resize', setRootHeight);
    };
  }, []);

  // Dummy data for available apps
  const apps = [
    { id: 1, name: 'App 1', description: 'This is App 1' },
    { id: 2, name: 'App 2', description: 'This is App 2' },
  ];

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    // Set the user's installed apps here
  };

  const handleInstall = (appId) => {
    // Handle the app installation here, e.g., save to the database
    const app = apps.find((app) => app.id === appId);
    setInstalledApps([...installedApps, app]);
  };

  if (!isLoggedIn) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div>
      <UserAppList installedApps={installedApps} />
      <AppList apps={apps} onInstall={handleInstall} />
    </div>
  );
};

export default App;
