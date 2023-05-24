import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GroceryItem from "../../components/GroceryItem";

test("renders correctly and responds to click", () => {
  const togglePurchased = jest.fn();

  const { getByText } = render(
    <GroceryItem
      item="Apple"
      index={0}
      purchased={false}
      togglePurchased={togglePurchased}
      removeItem={jest.fn()}
    />
  );

  expect(getByText("Apple")).toBeInTheDocument();
  fireEvent.click(getByText("Apple"));
  expect(togglePurchased).toHaveBeenCalled();
});
