import { render, screen } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

// Smoke test
render(<NewTodoForm />)

// Snapshot test
const {asFragment} = render(<NewTodoForm />)
expect(asFragment()).toMatchSnapshot()