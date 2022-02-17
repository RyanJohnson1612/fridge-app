import { useContext } from 'react';
import { Navigate } from "react-router";
import { authContext } from '../../providers/AuthProvider';

function ProtectedRoute({children}) {
  const { user } = useContext(authContext);
  return (
    user ? children : <Navigate to="/login" />
  );
}

export default ProtectedRoute;
