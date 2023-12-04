import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

test("renders without crashing", () => {
    render(<Card caption="test" src="./image1.jpg" currNum="3" totalNum="10"/>)
})

it("matches snapshot", () => {
    const { asFragment } = render(
                    <Card caption="test" 
                    src="./image1.jpg" 
                    currNum="3" 
                    totalNum="10"/> )
    expect(asFragment()).toMatchSnapshot()
})