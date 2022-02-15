import { useState, useContext } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../providers/AuthProvider';
axios.defaults.withCredentials = true;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  /* Validate form fields
   * @return {boolean}
   */
  const validateForm = () => {
    setErrors({})

    if(!email) {
      setErrors(prev => ({...prev, email: 'Email is required'}));
    }
    if(!password) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
    }

    if(Object.keys(errors).length === 0) return true;

    return false
  }

  /* Call validateForm, then login user in, if successful redirect
   * @return {function} call useNavigate hook
   */
  const submitForm = async () => {
    const valid = await validateForm();

    if(valid) {
      login(email, password)
        .then(res => {
          return navigate('/fridge');
        })
        .catch(err => {
          if (err.response) {
            setErrors(prev => ({...prev, server: err.response.data.error}));
          }
          console.log(err);
        })
    }
  }

  // Format form errors
  const parseErrors = [...new Set(Object.values(errors))].map((error, index) => <li className="register__error_message" key={index}>{error}</li>);

  return (
    <>
      <h1>Login to Fridge App</h1>
      <Form className="login__form" onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Label className={errors.email ? 'login__label login__label--error' : 'login__label'}>Email</Form.Label>
          <Form.Control
            className={errors.email ? 'login__input login__input--error' : 'login__input'}
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className={errors.password ? 'login__label login__label--error' : 'login__label'}>Password</Form.Label>
          <Form.Control
            className={errors.password ? 'register__input register__input--error' : 'register__input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        <Button className="login__button" type="submit" onClick={() => submitForm()}>Login</Button>

        {
          Object.keys(errors).length > 0 &&
          <Alert className="login__error" variant={'danger'}>
            <ul className="login__error_list">
              {parseErrors}
            </ul>
          </Alert>
        }
      </Form>
    </>
  );
}

export default Login;
