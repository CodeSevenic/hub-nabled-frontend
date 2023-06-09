﻿import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthContext } from '../../context/AuthContext';
import './Registration.css';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await register(username, email, password);
      console.log('STATUS: ', response);
      if (response.status === 200) {
        toast.success(response.message);
        return;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="registration-form">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h1>Register</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              placeholder="Username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="login-btn">
          <p>Already have an account?</p>
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
