import { useState, useEffect, createContext } from "react";
import { getUser, deleteCookie } from "../helpers/helpers";
import axios from 'axios';
axios.withCredentials = true;
axios.credentials = 'include';

export const authContext = createContext();

const AuthProvider = function(props) {
  const [user, setUser] = useState(null);

  // Set user on initial render
  useEffect(() => {
    setUser(getUser());
  }, []);

  /* Sends login request to API
   * @param {string} user email
   * @param {string} user password
   * @return {Promise}
   */
  const login = (email, password) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/login`, {email, password}, {withCredentials: true})
      .then(res => {
        setUser(getUser());
      });
  }

  /* Sends register request to API
   * @param {string} user firstName
   * @param {string} user lastName
   * @param {string} user email
   * @param {string} user password
   * @return {Promise}
   */
  const register = (firstName, lastName, email, password) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {firstName, lastName, email, password}, {withCredentials: true})
      .then(() => login(email, password))
      .then(() => createFridge(firstName))
      .catch(err => err);
  }

  const createFridge = (name) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/fridges`, {name}, {withCredentials: true})
      .then((res) => res)
      .catch(err => err);
  }

  /* Sends logout request to API, delete user cookie and set user to null
   * @return {Promise}
   */
  const logout = () => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/logout`, {withCredentials: true})
      .then(res => {
        deleteCookie('user');
        setUser(null);
      })
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
