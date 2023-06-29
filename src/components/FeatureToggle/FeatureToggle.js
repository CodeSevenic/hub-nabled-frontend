import React, { useState } from 'react';
import axios from 'axios'; // HTTP client for the browser and Node.js

const FeatureToggle = ({ userId, featureName, portalId }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleFeature = async (event) => {
    const isEnabled = event.target.checked;
    setIsEnabled(isEnabled);

    try {
      // Send a request to the server to toggle the feature
      const response = await axios.post(`http://localhost:4000/api/toggle-feature/${portalId}`, {
        userId: userId,
        featureName: featureName,
        isEnabled: isEnabled,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <p>
        <b>Enabled Features</b>
      </p>
      <label>
        {featureName}
        <input type="checkbox" checked={isEnabled} onChange={toggleFeature} />
      </label>
    </div>
  );
};

export default FeatureToggle;
