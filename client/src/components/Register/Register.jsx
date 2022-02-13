import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    console.log(passwordConfirm, password)
    if (password === passwordConfirm) {
      axios.post(`${process.env.REACT_APP_API_URL}/api/users`, {firstName, lastName, email, password})
        .then(res => {
          console.log(res);
        });
    } else {
      setError('Passwords don\'t match');
    }
  }

  return (
    <>
      <h1>Register for Fridge App</h1>
      <Form className="register__form" onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Label className="register__label">First Name</Form.Label>
          <Form.Control
            className="register__input"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="register__label">Last Name</Form.Label>
          <Form.Control
            className="register__input"
            type="text"
            value={lastName}
            onChange={e => setFirstName(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="register__label">Email</Form.Label>
          <Form.Control
            className="register__input"
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="register__label">Password</Form.Label>
          <Form.Control
            className="register__input"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="register__label">Confirm Password</Form.Label>
          <Form.Control
            className="register__input"
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.currentTarget.value)}
          />
        </Form.Group>
        <Button
          className="register__button"
          type="submit"
          variant={'primary'}
          onClick={() => handleSubmit()}>
            Register
        </Button>
        { error && <Alert variant={'danger'}>{error}</Alert>}
      </Form>
    </>
  );
}

export default Register;
