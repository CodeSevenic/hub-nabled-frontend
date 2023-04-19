import React, { useState } from 'react';
import RegistrationForm from '../../components/Registration/RegistrationForm';
import LoginForm from '../../components/Login/LoginForm';

const AuthPage = () => {
  const [registered, setRegistered] = useState(false);

  const handleRegister = ({ email, password }) => {
    // Handle user registration here, e.g., save to the database
    console.log('User registered:', { email, password });

    // Set the 'registered' state to true, so the LoginForm will be displayed
    setRegistered(true);
  };

  const handleLogin = ({ email, password }) => {
    // Handle user login here, e.g., validate user credentials
    console.log('User logged in:', { email, password });

    // Redirect to the app installation page or display a list of apps
  };

  return (
    <div className="auth-page">
      {registered ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <RegistrationForm onRegister={handleRegister} />
      )}
    </div>
  );
};

export default AuthPage;
