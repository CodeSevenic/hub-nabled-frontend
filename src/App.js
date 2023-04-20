import React, { useEffect, useRef, useState } from 'react';
import AuthPage from './pages/Auth/AuthPage';
import AppList from './components/AppList/AppList';
import UserAppList from './components/UserAppList/UserAppList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Registration/RegistrationForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';

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

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleInstall = (appId) => {
    // Handle the app installation here, e.g., save to the database
    const app = apps.find((app) => app.id === appId);
    setInstalledApps([...installedApps, app]);
  };

  // if (!isLoggedIn) {
  //   return <AuthPage onLogin={handleLogin} />;
  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
