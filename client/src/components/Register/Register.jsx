import { useState, useContext } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../providers/AuthProvider';
axios.defaults.withCredentials = true;

function Register(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { login, register } = useContext(authContext);

  /* Validate form fields
   * @return {boolean}
   */
  const validateForm = () => {
    setErrors({})
    if(!firstName) {
      setErrors(prev => ({...prev, firstName: 'First name is required'}));
    }
    if(!lastName) {
      setErrors(prev => ({...prev, lastName: 'Last name is required'}));
    }
    if(!email) {
      setErrors(prev => ({...prev, email: 'Email is required'}));
    }
    if(!password) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
    }
    if(!passwordConfirm) {
      setErrors(prev => ({...prev, passwordConfirm: 'Password is required'}));
    }
    if(password !== passwordConfirm) {
      setErrors(prev => ({...prev, password: 'Passwords don\'t match', passwordConfirm: 'Passwords don\'t match'}));
    }

    if(Object.keys(errors).length === 0) return true;

    return false
  }

  /* Call validateForm, then send register post request, then login user in if successful and redirect
   * @return {function} call useNavigate hook
   */
  const submitForm = async () => {
    const valid = await validateForm();

    if (valid) {
      register(firstName, lastName, email, password)
        .then(res => {
          return login(email, password);
        })
        .then(res => {
          return navigate('/fridge');
        })
        .catch(err => {
          if (err.response) {
            setErrors(prev => ({...prev, server: err.response.data.error}))
          }
        });
    }
  }

  // Format form errors
  const parseErrors = [...new Set(Object.values(errors))].map((error, index) => <li className="register__error_message" key={index}>{error}</li>);

  return (
    <>
      <h1>Register for Fridge App</h1>
      <Form className="register__form" onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Label className={errors.firstName ? 'register__label register__label--error' : 'register__label'}>First Name</Form.Label>
          <Form.Control
            className={errors.firstName ? 'register__input register__input--error' : 'register__input'}
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className={errors.lastName ? 'register__label register__label--error' : 'register__label'}>Last Name</Form.Label>
          <Form.Control
            className={errors.lastName ? 'register__input register__input--error' : 'register__input'}
            type="text"
            value={lastName}
            onChange={e => setLastName(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className={errors.email ? 'register__label register__label--error' : 'register__label'}>Email</Form.Label>
          <Form.Control
            className={errors.email ? 'register__input register__input--error' : 'register__input'}
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className={errors.password ? 'register__label register__label--error' : 'register__label'}>Password</Form.Label>
          <Form.Control
            className={errors.password ? 'register__input register__input--error' : 'register__input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className={errors.passwordConfirm ? 'register__label register__label--error' : 'register__label'}>Confirm Password</Form.Label>
          <Form.Control
            className={errors.passwordConfirm ? 'register__input register__input--error' : 'register__input'}
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.currentTarget.value)}
          />
        </Form.Group>

        <Button
          className="register__button"
          type="submit"
          variant={'primary'}
          onClick={() => submitForm()}>
            Register
        </Button>

        {
          Object.keys(errors).length > 0 &&
          <Alert className="register__error" variant={'danger'}>
            <ul className="register__error_list">
              {parseErrors}
            </ul>
          </Alert>
        }
      </Form>
    </>
  );
}

export default Register;
