import { useState, useContext } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { authContext } from '../../providers/AuthProvider';

function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { register } = useContext(authContext);

  /* Validate form fields
   * @return {boolean}
   */
  const validateForm = () => {
    setErrors({});
    let valid = true;

    if(!firstName) {
      setErrors(prev => ({...prev, firstName: 'First name is required'}));
      valid = false;
    }
    if(!lastName) {
      setErrors(prev => ({...prev, lastName: 'Last name is required'}));
      valid = false;
    }
    if(!email) {
      setErrors(prev => ({...prev, email: 'Email is required'}));
      valid = false;
    }
    if(!password) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
      valid = false;
    }
    if(!passwordConfirm) {
      setErrors(prev => ({...prev, passwordConfirm: 'Password is required'}));
      valid = false;
    }
    if(password !== passwordConfirm) {
      setErrors(prev => ({...prev, password: 'Passwords don\'t match', passwordConfirm: 'Passwords don\'t match'}));
      valid = false;
    }

    return valid;
  }

  /* Call validateForm, then send register post request, then login user in if successful and redirect
   * @return {function} call useNavigate hook
   */
  const submitForm = () => {
    if (validateForm()) {
      register(firstName, lastName, email, password)
        .then(res => {
          if ((res && res.status !== 201 && res.status !== 200)) {
            setErrors(prev => ({...prev, server: res.response.data.error}));
            return false;
          } else {
            return navigate('/fridge');
          }
        })
        .catch(err => {
          if (err.response) {
            setErrors(prev => ({...prev, server: err.response.data.error}))
          }
        });
    }
  }

  return (
    <>
      <h1>Register for Fridge App</h1>
      <Form className="register__form" onSubmit={e => e.preventDefault()}>
        <Form.Group className="register__form-group">
          <Form.Label className={errors.firstName ? 'register__label register__label--error' : 'register__label'} htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            className={errors.firstName ? 'register__input register__input--error' : 'register__input'}
            id="firstName"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.currentTarget.value)}
          />
          { errors.firstName && <Form.Text className="register__error">{errors.firstName}</Form.Text>}
        </Form.Group>

        <Form.Group className="register__form-group">
          <Form.Label className={errors.lastName ? 'register__label register__label--error' : 'register__label'} htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            className={errors.lastName ? 'register__input register__input--error' : 'register__input'}
            id="lastName"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.currentTarget.value)}
          />
          { errors.lastName && <Form.Text className="register__error">{errors.lastName}</Form.Text>}
        </Form.Group>

        <Form.Group className="register__form-group">
          <Form.Label className={errors.email ? 'register__label register__label--error' : 'register__label'} htmlFor="email">Email</Form.Label>
          <Form.Control
            className={errors.email ? 'register__input register__input--error' : 'register__input'}
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
          { errors.email && <Form.Text className="register__error">{errors.email}</Form.Text>}
        </Form.Group>

        <Form.Group className="register__form-group">
          <Form.Label className={errors.password ? 'register__label register__label--error' : 'register__label'} htmlFor="password">Password</Form.Label>
          <Form.Control
            className={errors.password ? 'register__input register__input--error' : 'register__input'}
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
          { errors.password && <Form.Text className="register__error">{errors.password}</Form.Text>}
        </Form.Group>

        <Form.Group className="register__form-group">
          <Form.Label className={errors.passwordConfirm ? 'register__label register__label--error' : 'register__label'} htmlFor="passwordConfirm">Confirm Password</Form.Label>
          <Form.Control
            className={errors.passwordConfirm ? 'register__input register__input--error' : 'register__input'}
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.currentTarget.value)}
          />
          { errors.passwordConfirm && <Form.Text className="register__error">{errors.passwordConfirm}</Form.Text>}
        </Form.Group>

        <Button
          className="register__button"
          type="submit"
          variant={'primary'}
          onClick={() => submitForm()}
          data-testid="submit-btn">
            Register
        </Button>

        { errors.server && <Alert variant={'danger'}>{errors.server}</Alert>}
      </Form>
      <p>Already have and account?  <br/> <Link to="/login">Login</Link></p>
    </>
  );
}

export default Register;
