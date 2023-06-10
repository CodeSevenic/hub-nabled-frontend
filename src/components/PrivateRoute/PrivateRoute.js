import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const PrivateRoute = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = { pathname: '/login', state: { from: location } };

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      if (isAdmin && location.pathname !== '/app-admin') {
        navigate('/app-admin', { replace: true });
      } else if (!isAdmin && location.pathname === '/app-admin') {
        navigate('/', { replace: true });
      }
    }
  }, [userId, isAdmin, navigate, location]);

  return userId ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
