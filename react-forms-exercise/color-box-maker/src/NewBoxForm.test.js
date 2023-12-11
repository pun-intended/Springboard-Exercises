import { render, screen } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

// Smoke test
test("Renders without crashing", () => {
    render(<NewBoxForm />)
})

// Snapshot test
test("Matches snapshot", () => {
    const {asFragment} = render(<NewBoxForm />)
    expect(asFragment()).toMatchSnapshot()
})
