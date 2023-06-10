import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = ({ redirectTo = '/' }) => {
  const userId = sessionStorage.getItem('userId');

  const location = useLocation();

  return userId ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
