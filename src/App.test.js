import { render, screen } from '@testing-library/react';
import App from './App';

test('test titre 1', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenue au Gusto Coffee, votre espace de coworking Gare du Nord/i);
  expect(linkElement).toBeInTheDocument();
});

test('test titre 2', () => {
  render(<App />);
  const linkElement = screen.getByText(/Découvrez notre salon de 120 places/i);
  expect(linkElement).toBeInTheDocument();
});

test('test titre 3', () => {
  render(<App />);
  const linkElement = screen.getByText(/Découvrez nos salons de 4 à 6 places/i);
  expect(linkElement).toBeInTheDocument();
});

test('test Bouton "Réserver une place"', () => {
  render(<App />);
  const linkElement = screen.getByText(/Réserver une place/i);
  expect(linkElement).toBeInTheDocument();
});