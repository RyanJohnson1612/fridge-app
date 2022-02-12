import React, { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";
import ShoppingListItem from "./ShoppingListItem";

function ShoppingList() {
  const [items, setItems] = useState([]);

  //Function to add items to shopping list, will be passed to ShoppingListForm
  const addItem = (item) => {
    const newItems = [item, ...items];
    setItems(newItems);
    console.log(...items);
  };

  //Function to remove item from shopping list,will be passed to ShoppingListItem component
  const removeItem = (id) => {
    //Check items array for the target item, and filter it out to remove
    const removeArr = [...items].filter((item) => item.id !== id);

    setItems(removeArr);
  };

  //Function to toggle item as completed or not, will be passed to ShoppingListItem component
  const completeItem = (id) => {
    let updatedItems = items.map((item) => {
      if (item.id === id) {
        /* toggles isComplete between true and false */
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <h1> My Grocery List</h1>
      <ShoppingListForm onSubmit={addItem} />
      <ShoppingListItem
        items={items}
        completeItem={completeItem}
        removeItem={removeItem}
      />
    </div>
  );
}

export default ShoppingList;
