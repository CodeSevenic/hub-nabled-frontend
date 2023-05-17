// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [newApp, setNewApp] = useState({ appName: '', appId: '', appSecret: '', scopes: '' });
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get('http://localhost:4000/apps');
        setApps(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApps();
  }, []);
  // Update newApp state based on form input
  const handleChange = (e) => {
    setNewApp({ ...newApp, [e.target.name]: e.target.value });
  };

  // Submit new app's details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/apps', newApp);
      setApps([...apps, response.data]); // Add new app to list
      setNewApp({ appName: '', appId: '', appSecret: '', scopes: '' });
      alert('App added successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the app');
    }
  };

  // Delete an app by ID
  const deleteApp = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/apps/${id}`);
      setApps(apps.filter((app) => app.id !== id)); // Remove app from list
      alert('App deleted successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the app');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-column">
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
      <div className="admin-dashboard-column">
        <h2>Existing Apps</h2>
        {apps.map((app) => (
          <div key={app.id} className="app-item">
            <p>{app.appName}</p>
            <button onClick={() => deleteApp(app.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
