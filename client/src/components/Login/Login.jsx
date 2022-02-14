import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';
import { auth } from '../../helpers/helpers';
axios.defaults.withCredentials = true;


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    setError('')
    if(!email) {
      setError('Email is required');
      return;
    }
    if(!password) {
      setError('Password is required');
      return;
    }

    submitForm();
  }

  const submitForm = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {email, password})
      .then(res => {
        console.log(auth());
      })
      .catch(err => {
        if (err.responsew) {
          setError(err.response.data.error)
        }
        console.log(err);
      })
  }

  return (
    <>
      <h1>Login to Fridge App</h1>
      <Form className="login__form" onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Label className="login__label">Email</Form.Label>
          <Form.Control
            className="login__input"
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="login__label">Password</Form.Label>
          <Form.Control
            className="login__input"
            type="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        <Button className="login__button" type="submit" onClick={() => validateForm()}>Login</Button>
        { error && <Alert variant={'danger'}>{error}</Alert> }
      </Form>
    </>
  );
}

export default Login;
