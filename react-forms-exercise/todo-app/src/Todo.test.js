import { render, screen } from '@testing-library/react';

// Smoke test
test("renders without crashing", () => {
    render(<Todo task="TestTask" id="111" />)
})


// Snapshot test
test("Matches snapshot", () => {
    const {asFragment} = render(<Todo task="TestTask" id="111" />)
    expect(asFragment()).toMatchSnapshot()
})

