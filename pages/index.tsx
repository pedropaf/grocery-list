import React, { useState } from "react";
import { FaPlus } from 'react-icons/fa';
import GroceryList from "../components/GroceryList";
import { GroceryItem } from "../pages/api/grocery";

export default function IndexPage() {
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (newItem.trim() === '') return;
    const updatedGroceries = [
      ...groceries,
      { item: newItem, purchased: false }
    ];
    setGroceries(updatedGroceries);
    setNewItem('');
  }

  const removeItem = (index: number) => {
    const updatedGroceries = groceries.filter((item, i) => i !== index);
    setGroceries(updatedGroceries);
  }

  const togglePurchased = (index: number) => {
    const updatedGroceries = [...groceries];
    updatedGroceries[index].purchased = !updatedGroceries[index].purchased;
    setGroceries(updatedGroceries);
  }

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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" aria-label="Add Item">
            <FaPlus />
          </button>
        </form>
        <GroceryList items={groceries} togglePurchased={togglePurchased} removeItem={removeItem} />
      </div>
      <div className="w-full h-15 bg-blue-600" />
    </>
  )
}
