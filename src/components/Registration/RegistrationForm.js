import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Registration.css';
import { Link } from 'react-router-dom';

const RegistrationForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await register(email, password);
    // } catch (error) {
    //   alert(error.message);
    // }
    // onRegister({ email, password });
  };

  return (
    <div className="auth-page">
      <div className="registration-form">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="login-btn">
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
