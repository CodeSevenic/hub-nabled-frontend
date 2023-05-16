// src/components/AdminDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [newApp, setNewApp] = useState({ appName: '', appId: '', appSecret: '', scopes: '' });

  // Update newApp state based on form input
  const handleChange = (e) => {
    setNewApp({ ...newApp, [e.target.name]: e.target.value });
  };

  // Submit new app's details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('newApp: ', newApp);
      await axios.post('http://localhost:4000/apps', newApp);
      setNewApp({ appName: '', appId: '', appSecret: '', scopes: '' });
      alert('App added successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the app');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Add New App</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="appId">App Name:</label>
        <input
          type="text"
          id="appName"
          name="appName"
          value={newApp.appName}
          onChange={handleChange}
          required
        />
        <label htmlFor="appId">App ID:</label>
        <input
          type="text"
          id="appId"
          name="appId"
          value={newApp.appId}
          onChange={handleChange}
          required
        />
        <label htmlFor="appSecret">App Secret:</label>
        <input
          type="text"
          id="appSecret"
          name="appSecret"
          value={newApp.appSecret}
          onChange={handleChange}
          required
        />
        <label htmlFor="scopes">Scopes (comma-separated):</label>
        <input
          type="text"
          id="scopes"
          name="scopes"
          value={newApp.scopes}
          onChange={handleChange}
          required
        />
        <button type="submit">Add App</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
