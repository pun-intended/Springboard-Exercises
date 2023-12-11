import { render, screen } from '@testing-library/react';
import App from './App';

// Smoke test
test("renders without crashing", () => {
  render(<App />)
})

// Snapshot test
test("Matches snapshot", () => {
  const {asFragment} = render(<App />)
  expect(asFragment()).toMatchSnapshot()
})