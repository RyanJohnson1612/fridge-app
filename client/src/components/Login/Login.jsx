import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {email, password})
      .then(res => {
        console.log(res);
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

        <Button className="login__button" type="submit" onClick={() => handleSubmit()}>Login</Button>
      </Form>
    </>
  );
}

export default Login;
