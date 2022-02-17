import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from '../../providers/AuthProvider';
import Register from './Register';

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(cleanup);

it('renders without crashing', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>, container);
  expect(screen.getByText('Register for Fridge App')).toBeInTheDocument();
});

it('displays errors when a field is not filled in', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>, container);
    const loginBtn = screen.getByTestId('submit-btn');
    fireEvent.click(loginBtn);
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getAllByText('Password is required').length).toEqual(2);
});

it('displays error when passwords don\'t match', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>, container);
    const loginBtn = screen.getByTestId('submit-btn');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(firstNameInput, {target: {value: 'test'}});
    fireEvent.change(lastNameInput, {target: {value: 'user'}});
    fireEvent.change(emailInput, {target: {value: 'test@user.com'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.change(passwordConfirmInput, {target: {value: 'incorrectpassword'}});
    fireEvent.click(loginBtn);

    expect(screen.getAllByText('Passwords don\'t match').length).toEqual(2);
});

it('doesn\'t displays errors when all fields are filled in', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>, container);
    const loginBtn = screen.getByTestId('submit-btn');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(firstNameInput, {target: {value: 'test'}});
    fireEvent.change(lastNameInput, {target: {value: 'user'}});
    fireEvent.change(emailInput, {target: {value: 'test@user.com'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.change(passwordConfirmInput, {target: {value: 'password'}});
    fireEvent.click(loginBtn);

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
});


