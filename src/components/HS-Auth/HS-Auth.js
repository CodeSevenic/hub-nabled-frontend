import React, { useState } from 'react';
import axios from 'axios';

function HSAuth() {
  const [loading, setLoading] = useState(false);

  const handleAuthClick = async () => {
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8000/api/v1/auth');
      const authUrl = response.data.authUrl;
      window.location.href = authUrl;
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>HubSpot OAuth Test</h1>
      <button onClick={handleAuthClick} disabled={loading}>
        {loading ? 'Loading...' : 'Authorize with HubSpot'}
      </button>
    </div>
  );
}

export default HSAuth;
