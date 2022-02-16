import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from '../../providers/AuthProvider';
import Login from './Login';

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
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>, container);
  expect(screen.getByText('Login to Fridge App')).toBeInTheDocument();
});

it('displays errors when fields are not filled in', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>, container);
    const loginBtn = screen.getByTestId('submit-btn');
    fireEvent.click(loginBtn);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
});

it('doesn\'t displays errors when all fields are filled in', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>, container);
    const loginBtn = screen.getByTestId('submit-btn');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, {target: {value: 'test@user.com'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.click(loginBtn);

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
});


