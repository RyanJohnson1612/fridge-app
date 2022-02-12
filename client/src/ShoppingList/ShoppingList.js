import React, { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";

function ShoppingList() {
  const [items, setItems] = useState([]);

  return (
    <div>
      <h1> My Grocery List</h1>
      <ShoppingListForm />
    </div>
  );
}

export default ShoppingList;
