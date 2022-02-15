import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { auth, deleteCookie } from "../helpers/helpers";

export const authContext = createContext();

const AuthProvider = function(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = auth();
    setUser(user);
  }, []);

  const login = (email, password) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/login`, {email, password})
      .then(res => {
        const user = auth();
        setUser(user);
      })
      .catch(err => err);
  }

  const register = (firstName, lastName, email, password) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {firstName, lastName, email, password})
      .catch(err => err);
  }

  const logout = () => {
    deleteCookie('user');
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/logout`)
      .catch(err => err);
  }

  const data = { user, login, register, logout };

  return (
    <authContext.Provider value={data}>
      {props.children}
    </authContext.Provider>
  )
}

export default AuthProvider;
