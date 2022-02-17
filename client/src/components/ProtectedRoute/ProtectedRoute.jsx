import { useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from '../../providers/AuthProvider';

function ProtectedRoute({children, ...props}) {
  const { user } = useContext(authContext);
  const location = useLocation();

  return (
    user ? children : <Navigate to={props.redirectTo || "/login"} state={{message: props.message, from: location}}/>
  );
}

export default ProtectedRoute;
