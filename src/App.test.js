import { render, screen } from '@testing-library/react';
import App from './App';

test('test texte bienvenue sur page accueil', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenue/i);
  expect(linkElement).toBeInTheDocument();
});

test('test2', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenue au Gusto Coffee/i);
  expect(linkElement).toBeInTheDocument();
});