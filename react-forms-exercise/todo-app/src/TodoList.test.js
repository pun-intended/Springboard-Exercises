import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import Todo from './Todo';

function addTodo(list, task="new task"){
    const taskInput = list.getByLabeltext("Task:")
    fireEvent.change(taskInput, {target: {value: task}});
    const btn = list.getByText("Add")
    fireEvent.click(btn)
}

// Smoke test
render(<TodoList />)

// Snapshot test
const { asFragment } = render(<TodoList />)
expect(asFragment()).toMatchSnapshot()

// Can add item
test("Can add todos", () => {
    const list = render(<TodoList />)
    addTodo(list)

    // Expect task to be added and input cleared
    expect(list.getByLabelText("Task:")).toHaveValue("")
    expect(list.getByText("new task")).toBeInTheDocument()
    expect(list.getByText("X")).toBeInTheDocument()
})
// Can delete item
test("Can delete todos", () => {
    const list = render(<TodoList />)
    addTodo(list)

    fireEvent.click(list.getByText("X"))
    expect(list.queryByText("new task")).not.toBeInTheDocument()
})