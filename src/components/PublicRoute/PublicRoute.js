import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = ({ isLoggedIn, redirectTo = '/user-dashboard' }) => {
  const location = useLocation();

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
