import { Navigate, useLocation } from "react-router-dom";
import { getUser } from '../../helpers/helpers';

function ProtectedRoute({children, ...props}) {
  const user = getUser();
  const location = useLocation();

  return (
    user ? children : <Navigate to={props.redirectTo || "/login"} state={{message: props.message, from: location}}/>
  );
}

export default ProtectedRoute;
