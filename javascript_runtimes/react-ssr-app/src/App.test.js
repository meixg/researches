import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fractal component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mandelbrot Fractal/i);
  expect(linkElement).toBeInTheDocument();
});
