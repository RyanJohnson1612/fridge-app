import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = () => {
    if (password === passwordConfirm) {
      axios.post(`${process.env.REACT_APP_API_URL}/api/users`, {firstName, lastName, email, password})
        .then(res => {
          console.log(res);
        });
    }
  }

  return (
    <>
      <h1>Register for Fridge App</h1>
      <form className="register__form" onSubmit={e => e.preventDefault()}>
        <label className="register__label">First Name</label>
        <input className="register__input" type="text" name="first_name" value={firstName} onChange={e => setFirstName(e.currentTarget.value)}/>
        <label className="register__label">Last Name</label>
        <input className="register__input" type="text" name="last_name" value={lastName} onChange={e => setLastName(e.currentTarget.value)}/>
        <label className="register__label">Email</label>
        <input className="register__input" type="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
        <label className="register__label">Password</label>
        <input className="register__input" type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
        <label className="register__label">Confirm Password</label>
        <input className="register__input" type="password" name="password_confirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.currentTarget.value)}/>
        <button type="submit" onClick={() => handleSubmit()}>Login</button>
      </form>
    </>
  );
}

export default Register;
