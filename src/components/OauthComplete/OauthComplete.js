import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OauthComplete = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a value in LocalStorage to indicate that the OAuth process is complete
    localStorage.setItem('oauth_complete', 'true');

    // Redirect to the main app
    navigate('/');
  }, [navigate]);

  return null;
};

export default OauthComplete;
