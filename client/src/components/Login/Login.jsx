import { useState, useContext, useEffect } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authContext } from '../../providers/AuthProvider';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(authContext);

  /* Validate form fields
   * @return {boolean}
   */
  const validateForm = () => {
    setErrors({})
    let valid = true;

    if(!email) {
      setErrors(prev => ({...prev, email: 'Email is required'}));
      valid = false;
    }
    if(!password) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
      valid = false;
    }

    return valid;
  }

  /* Call validateForm, then login user in, if successful redirect
   * @return {function} call useNavigate hook
   */
  const submitForm = () => {
    if(validateForm()) {
      login(email, password)
        .then(res => {
          if (res && res.response.status !== 200) {
            setErrors(prev => ({...prev, server: res.response.data.error}));
          } else {
            return navigate('/fridge');
          }
        })
        .catch(err => {
          if (err.response) {
            setErrors(prev => ({...prev, server: err.response.data.error}));
          }
          console.log(err);
        })
    }
  }

  // Display redirect message if one exists
  useEffect(() => {
    if (location.state) {
      setErrors({
        redirect: location.state.message
      });
    }
  }, [])


  return (
    <>
      <h1>Login to Fridgie</h1>
      <Form className="login__form" onSubmit={e => e.preventDefault()}>
        <Form.Group className="login__form-group">
          <Form.Label className={errors.email ? 'login__label login__label--error' : 'login__label'} htmlFor="email">Email</Form.Label>
          <Form.Control
            className={errors.email ? 'login__input login__input--error' : 'login__input'}
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
          { errors.email && <Form.Text className="login__error">{errors.email}</Form.Text>}
        </Form.Group>

        <Form.Group className="login__form-group">
          <Form.Label className={errors.password ? 'login__label login__label--error' : 'login__label'} htmlFor="password">Password</Form.Label>
          <Form.Control
            className={errors.password ? 'register__input register__input--error' : 'register__input'}
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
          { errors.password && <Form.Text className="login__error">{errors.password}</Form.Text>}
        </Form.Group>

        <Button
          className="login__button"
          type="submit"
          onClick={() => submitForm()}
          data-testid="submit-btn">
            Login
        </Button>

        { errors.server && <Alert variant={'danger'}>{errors.server}</Alert>}
        { errors.redirect && <Alert variant={'primary'}>{errors.redirect}</Alert>}
      </Form>
      <p>Don't have an account?  <br/> <Link to="/register">Register</Link></p>
    </>
  );
}

export default Login;
