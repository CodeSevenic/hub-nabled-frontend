const { Navigate } = require('react-router-dom');

const AdminRoute = ({ isLoggedIn, isAdmin, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
