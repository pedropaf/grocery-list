import React from "react";
import { render, fireEvent, screen, act, waitFor } from "@testing-library/react";
import IndexPage from "../pages/index";

jest.mock("../pages/api/grocery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockFetch = jest.fn();
const mockFetchResponse = jest.fn().mockResolvedValue({
  json: () => Promise.resolve([]),
  ok: true,
});

beforeEach(() => {
  mockFetch.mockClear();
  (global.fetch as jest.Mock) = mockFetch;
  mockFetch.mockImplementation((url: string) => {
    if (url.includes("/api/grocery")) {
      return mockFetchResponse();
    }
    return Promise.reject(new Error("Unhandled fetch request"));
  });
});

test("renders empty list when fetch response is empty", async () => {
  await act(async () => {
    render(<IndexPage />);
  });
  const groceryList = screen.getByTestId("grocery-list");
  expect(groceryList.children).toHaveLength(0);
});

test("renders list with 2 items when fetch response contains 2 items", async () => {
  const mockItems = [
    { item: "Apple", purchased: false },
    { item: "Banana", purchased: true },
  ];

  (global.fetch as jest.Mock).mockResolvedValueOnce(
    Promise.resolve({
      json: () => Promise.resolve(mockItems),
      ok: true,
    })
  );

  await act(async () => {
    render(<IndexPage />);
  });
  
  const listItems = screen.getAllByTestId(/^item-\d+$/);
  expect(listItems.length).toBe(2);
});

test("adds an item to the list", async () => {
  render(<IndexPage />);
  const addButton = screen.getByRole("button", { name: /add item/i });

  await act(async() => {
    fireEvent.change(screen.getByPlaceholderText("Add grocery item"), {
      target: { value: "Apple" },
    });
    fireEvent.click(addButton);
  });

  const listItems = screen.getAllByTestId(/^item-\d+$/);
  expect(listItems.length).toBe(1);
});

test("toggles an item in the list", async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    json: () => Promise.resolve([{ item: "Apple", purchased: false }]),
    ok: true,
  });

  await act(async () => {
    render(<IndexPage />);
  });

  await waitFor(() => {
    const purchaseButton = screen.getByTestId("item-text-0");
    fireEvent.click(purchaseButton);

    const listItem = screen.getByText("Apple");
    expect(listItem).toHaveClass("line-through text-gray-500");
  });
});

test("removes an item from the list", async () => {
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      json: () => Promise.resolve([{ item: "Apple", purchased: false }]),
      ok: true,
    })
    .mockResolvedValueOnce({
      json: () => Promise.resolve([]),
      ok: true,
    });

  await act(async () => {
    render(<IndexPage />);
  });

  await waitFor(() => {
    const removeButton = screen.getByTestId("remove-button-0");
    fireEvent.click(removeButton);
  });

  const listItemAfterRemoval = screen.queryByText("Apple");
  expect(listItemAfterRemoval).toBeNull();
});
