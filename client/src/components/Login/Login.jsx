import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('submit', email, password)
  }

  return (
    <>
      <h1>Login to Fridge App</h1>
      <form className="login__form">
        <label className="login__label">Email</label>
        <input className="login__input" type="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
        <label lassName="login__label">Password</label>
        <input className="login__input" type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
        <button type="submit" onSubmit={handleSubmit}>Login</button>
      </form>
    </>
  );
}

export default Login;
