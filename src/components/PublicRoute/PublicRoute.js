import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = ({ isLoggedIn, redirectTo = '/' }) => {
  const location = useLocation();

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
