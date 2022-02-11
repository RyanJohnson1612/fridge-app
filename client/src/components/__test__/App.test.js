import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('that it renders', () => {
  render(<App />);
  const linkElement = screen.getByText(/Fridge App/i);
  expect(linkElement).toBeInTheDocument();
});
