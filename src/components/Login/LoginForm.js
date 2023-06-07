import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    // store email on session storage
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('response: ', response);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Wrong Password or Email');
      }
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

      <div className="login-form">
        <form onSubmit={handleSubmit} autoComplete="off">
          <h1>Login</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
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
              autoComplete="new-password"
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
