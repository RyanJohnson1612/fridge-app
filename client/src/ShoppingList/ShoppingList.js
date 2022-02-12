import React, { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";

function ShoppingList() {
  const [items, setItems] = useState([]);

  //Function to add items to shopping list, will be passed to ShoppingListForm using onSubmit
  const addItem = (item) => {
    const newItems = [item, ...items];
    setItems(newItems);
    console.log(...items);
  };

  return (
    <div>
      <h1> My Grocery List</h1>
      <ShoppingListForm onSubmit={addItem} />
    </div>
  );
}

export default ShoppingList;
