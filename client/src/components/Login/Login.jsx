import { useState } from 'react';
import axios from 'axios';

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
      <form className="login__form" onSubmit={e => e.preventDefault()}>
        <label className="login__label">Email</label>
        <input className="login__input" type="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
        <label className="login__label">Password</label>
        <input className="login__input" type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
        <button type="submit" onClick={() => handleSubmit()}>Login</button>
      </form>
    </>
  );
}

export default Login;
