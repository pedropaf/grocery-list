import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

type GroceryItemProps = {
  item: string;
  purchased: boolean;
  togglePurchased: () => void;
  removeItem: () => void;
  index: number;
};

const GroceryItem: React.FC<GroceryItemProps> = ({
  item,
  purchased,
  togglePurchased,
  removeItem,
  index,
}) => {
  return (
    <div className="flex items-center justify-between mb-2" data-testid={`item-${index}`}>
      <div
        onClick={togglePurchased}
        className={`${
          purchased ? "line-through text-gray-500" : ""
        } cursor-pointer`}
        data-testid={`item-text-${index}`}
      >
        {item}
      </div>
      <div className="flex items-center space-x-4">
        {purchased && (
          <FaCheck
            className="text-green-500"
            data-testid={`purchase-button-${index}`}
          />
        )}
        <FaTrash
          onClick={removeItem}
          className="text-red-500 cursor-pointer"
          data-testid={`remove-button-${index}`}
        />
      </div>
    </div>
  );
};

export default GroceryItem;
