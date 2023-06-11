import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PublicRoute = ({ redirectTo = '/' }) => {
  // check if user is logged in with useContext hook
  const { isLoggedIn } = useContext(AuthContext);

  console.log('isLoggedIn: ', isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
