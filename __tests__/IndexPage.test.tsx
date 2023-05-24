import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import IndexPage from "../pages/index";

jest.mock("../pages/api/grocery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("renders correctly and responds to events", () => {
  render(<IndexPage />);

  // Reference to the input field and buttons
  const inputField = screen.getByPlaceholderText("Add grocery item");
  const addButton = screen.getByRole("button", { name: /add item/i });

  // Add an item
  fireEvent.change(inputField, { target: { value: "Apple" } });
  fireEvent.click(addButton);

  // Assertion: Check if the item is added
  const listItem = screen.getByText("Apple");
  expect(listItem).toBeInTheDocument();

  // Mark the item as purchased
  const purchaseButton = screen.getByTestId("item-text-0");
  fireEvent.click(purchaseButton);

  // Assertion: Check if the item is marked as purchased
  expect(listItem).toHaveClass("line-through text-gray-500 cursor-pointer");

  // Remove the item
  const removeButton = screen.getByTestId("remove-button-0");
  fireEvent.click(removeButton);

  // Assertion: Check if the item is removed
  expect(listItem).not.toBeInTheDocument();
});
