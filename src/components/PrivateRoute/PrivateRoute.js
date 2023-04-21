import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = { pathname: '/login', state: { from: location } };

  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin && location.pathname !== '/app-admin') {
        navigate('/app-admin', { replace: true });
      } else if (!isAdmin && location.pathname === '/app-admin') {
        navigate('/', { replace: true });
      }
    }
  }, [isLoggedIn, isAdmin, navigate, location]);

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
