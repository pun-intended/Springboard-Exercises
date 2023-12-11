import { render, screen, fireEvent } from '@testing-library/react';
import BoxList from './BoxList';

function addBox(list, w=5, h=5, c="blue"){
  const widthInput = list.queryByLabelText("Width:")
  const heightInput = list.queryByLabelText("Height:")
  const colorInput = list.queryByLabelText("Color:")
  fireEvent.change(widthInput, {target: {value: w}})
  fireEvent.change(heightInput, {target: {value: h}})
  fireEvent.change(colorInput, {target: {value: c}})
  const btn = list.queryByText("Submit")
  fireEvent.click(btn)
}

// Smoke test
test("renders without crashing", () => {
    render(<App />)
  })
  
// Snapshot test
test("Matches snapshot", () => {
    const {asFragment} = render(<BoxList />)
    expect(asFragment()).toMatchSnapshot()
  })

// Can add box
test("Can add boxes", () => {
  const list = render(<BoxList />)
  expect(list.queryByText("X")).not.toBeInTheDocument()
  
  addBox(list)
  const btn = list.queryByText("X")
  expect(btn).toBeInTheDocument()
  expect(btn.previousSibling).toHaveStyle(`
    width: 5em
    heigh: 5em
    background-color: "blue"
  `)
  
  // Expect form to be cleared
  expect(list.getAllByDisplayValue()).toHaveLength(3)
})

// Can delete box
test("Can delete boxes", () => {
  const list = render(<BoxList />)
  addBox(list)

  const btn = list.getByText("X")
  fireEvent.click(btn)

  expect(list.queryByText("X")).not.toBeInTheDocument()
})