import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
  };

  return (
    <div className="auth-page">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <button type="submit">Login</button>
        </form>
        <div className="register-btn">
          <p>Don't have an account yet?</p>
          <Link to={'/register'}>
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
