import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { getUser, deleteCookie } from "../helpers/helpers";

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
      .post(`${process.env.REACT_APP_API_URL}/api/users/login`, {email, password})
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
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {firstName, lastName, email, password})
      .then(() => login(email, password))
      .then(() => createFridge(user.id, user.firstName))
      .catch(err => err);
  }

  const createFridge = (id, name) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/fridges`, {id, name})
      .then((res) => res)
      .catch(err => err);
  }

  /* Sends logout request to API, delete user cookie and set user to null
   * @return {Promise}
   */
  const logout = () => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/logout`)
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
