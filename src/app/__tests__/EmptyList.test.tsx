/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EmptyList from "../../components/EmptyList";

describe("EmptyTextCheck", () => {
  it('should render "There is no result data."', () => {
    render(<EmptyList />); // ARRANGE

    //ACT
    const message = screen.getByText("There is no result data.");

    expect(message).toBeInTheDocument(); // ASSERT
  });
});
