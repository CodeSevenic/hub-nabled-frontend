import React, { useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Registration/RegistrationForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';
import PublicRoute from './components/PublicRoute/PublicRoute';
import { AuthContext } from './context/AuthContext';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserDashboard from './components/UserAdminDashboard/UserAdminDashboard';

const App = () => {
  const [installedApps, setInstalledApps] = useState([]);

  const { isLoggedIn, isAdmin } = useContext(AuthContext);

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
    // Set the user's installed apps here
  };

  console.log('isLoggedIn: ', isLoggedIn);

  const handleInstall = (appId) => {
    // Handle the app installation here, e.g., save to the database
    const app = apps.find((app) => app.id === appId);
    setInstalledApps([...installedApps, app]);
  };

  console.log('isAdmin: ', isAdmin);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn} />}>
          <Route index element={<LoginForm />} />
        </Route>
        <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn} />}>
          <Route index element={<RegistrationForm />} />
        </Route>
        <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} />}>
          <Route index element={<UserDashboard />} />
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route
          path="/app-admin"
          element={<PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} />}
        >
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
