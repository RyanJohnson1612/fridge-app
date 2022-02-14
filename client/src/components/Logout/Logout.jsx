import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../providers/AuthProvider';

function Logout() {
  const { logout } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  return <></>
}

export default Logout();
