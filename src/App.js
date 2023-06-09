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
import OauthComplete from './components/OauthComplete/OauthComplete';
import Layout from './components/Layout/Layout';

const App = () => {
  const { setIsAdmin, setIsLoggedIn } = useContext(AuthContext);
  // useEffect function to handle messages from the OAuth window
  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     const expectedOrigin = 'http://localhost:3000'; // Replace with your expected origin

  //     if (event.origin !== expectedOrigin) {
  //       console.warn('Received message from untrusted origin, ignoring.');
  //       return;
  //     }

  //     if (event.data.command === 'close') {
  //       window.close();
  //       console.log('window.close() happened on App.js');
  //     }
  //   };

  //   window.addEventListener('message', handleMessage);

  //   return () => {
  //     window.removeEventListener('message', handleMessage);
  //   };
  // }, []);

  useEffect(() => {
    // Keep the #root container full height
    function setRootHeight() {
      const root = document.getElementById('root');
      if (root) {
        const windowHeight = window.innerHeight;
        root.style.height = `${windowHeight}px`;
      }
    }

    if (sessionStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(JSON.parse(sessionStorage.getItem('isLoggedIn')));
    }

    if (sessionStorage.getItem('isAdmin')) {
      setIsAdmin(JSON.parse(sessionStorage.getItem('isAdmin')));
    }

    setRootHeight();

    window.addEventListener('resize', setRootHeight);

    return () => {
      window.removeEventListener('resize', setRootHeight);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<LoginForm />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route index element={<RegistrationForm />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<UserDashboard />} />
        </Route>
        <Route path="/oauth-complete" element={<OauthComplete />} />
        <Route path="app-admin" element={<PrivateRoute />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
