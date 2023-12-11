import { render, screen } from '@testing-library/react';
import Box from "./Box.js"

// Smoke test
test("renders without crashing", () => {
    render(<Box width={10} height={10} color={blue} id={122} remove={() => {}}/>)
  })
  
  // Snapshot test
test("Matches snapshot", () => {
    const {asFragment} = render(<Box width={10} height={10} color={blue} id={122} remove={() => {}}/>)
    expect(asFragment()).toMatchSnapshot()
  })