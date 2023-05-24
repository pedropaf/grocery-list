import React from "react";
import GroceryItem from "./GroceryItem";
import { GroceryItem as GroceryItemType } from "../pages/api/grocery";

interface GroceryListProps {
  items: GroceryItemType[];
  togglePurchased: (index: number) => void;
  removeItem: (index: number) => void;
}

const GroceryList: React.FC<GroceryListProps> = ({
  items,
  togglePurchased,
  removeItem,
}) => (
  <div>
    {items.map((item, index) => (
      <GroceryItem
        key={index}
        index={index}
        item={item.item}
        purchased={item.purchased}
        togglePurchased={() => togglePurchased(index)}
        removeItem={() => removeItem(index)}
      />
    ))}
  </div>
);

export default GroceryList;
