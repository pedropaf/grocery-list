import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GroceryList from "../../components/GroceryList";

test("renders list correctly and handles events", () => {
  const items = [
    { item: "Apple", purchased: false },
    { item: "Banana", purchased: true },
  ];
  const togglePurchased = jest.fn();
  const removeItem = jest.fn();

  const { getByTestId, getAllByTestId } = render(
    <GroceryList
      items={items}
      togglePurchased={togglePurchased}
      removeItem={removeItem}
    />
  );

  expect(getByTestId("item-text-0")).toHaveTextContent("Apple");
  expect(getByTestId("item-text-1")).toHaveTextContent("Banana");

  const buttons = getAllByTestId(/item-text|remove-button/);

  fireEvent.click(buttons[0]); // item text is for toggling purchase status
  expect(togglePurchased).toHaveBeenCalledWith(0);

  fireEvent.click(buttons[1]); // second button is for removing an item
  expect(removeItem).toHaveBeenCalledWith(0);
});
