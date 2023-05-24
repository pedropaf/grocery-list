import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import GroceryList from "../components/GroceryList";
import { GroceryItem } from "./api/grocery";

const IndexPage: React.FC = () => {
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("/api/grocery")
      .then((response) => response.json())
      .then((data) => setGroceries(data))
      .catch((error) => console.error("Error fetching groceries:", error));
  }, []);

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (newItem.trim() === "") return;

    fetch("/api/grocery", {
      method: "POST",
      body: JSON.stringify({ item: newItem, purchased: false }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setGroceries([...groceries, data]))
      .catch((error) => console.error("Error adding grocery:", error));

    setNewItem("");
  };

  const removeItem = (index: number) => {
    fetch(`/api/grocery/${index}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedGroceries = [...groceries];
        updatedGroceries.splice(index, 1);
        setGroceries(updatedGroceries);
      })
      .catch((error) => console.error("Error removing item:", error));
  };

  const togglePurchased = (index: number) => {
    const updatedGroceries = [...groceries];
    updatedGroceries[index].purchased = !updatedGroceries[index].purchased;

    fetch(`/api/grocery/${index}`, {
      method: "PUT",
      body: JSON.stringify(updatedGroceries[index]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => setGroceries(updatedGroceries))
      .catch((error) =>
        console.error("Error toggling purchased status:", error)
      );
  };

  return (
    <>
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-semibold">Equal Experts Grocery List</h1>
      </header>
      <div className="p-4">
        <form onSubmit={addItem} className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Add grocery item"
            className="mr-2 flex-grow"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            aria-label="Add Item"
          >
            <FaPlus />
          </button>
        </form>
        <GroceryList
          items={groceries}
          togglePurchased={togglePurchased}
          removeItem={removeItem}
        />
      </div>
      <div className="w-full h-15 bg-blue-600" />
    </>
  );
};

export default IndexPage;
