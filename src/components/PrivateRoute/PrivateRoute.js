import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn }) => {
  const location = useLocation();
  const redirectTo = { pathname: '/login', state: { from: location } };

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
