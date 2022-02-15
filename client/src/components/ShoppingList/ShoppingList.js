import React, { useState, useEffect } from "react";
import ShoppingListForm from "./ShoppingListForm";
import ShoppingListItem from "./ShoppingListItem";
import axios from "axios";

function ShoppingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("I run everytime this component rerenders");
  }, []);

  //Function to add items to shopping list, will be passed to ShoppingListForm
  const addItem = (item) => {
    const newItems = [item, ...items];
    setItems(newItems);
    console.log(...items);
  };

  //Function to update item in shopping list, will be passed to ShoppingListItem component
  const updateItem = (itemId, newValue) => {
    setItems((prev) =>
      //if the item.id matches, set it to newValue, otherwise set it back to item
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  //Function to remove item from shopping list,will be passed to ShoppingListItem component
  const removeItem = (id) => {
    //Check items array for the target item, and filter it out to remove
    const removeArr = [...items].filter((item) => item.id !== id);

    setItems(removeArr);
  };

  //Placeholder --> replace with function that adds item to user's fridge
  const addToFridge = (id) => {
    console.log("The item was added to your fridge!");
  };

  //Function to toggle item as completed or not, will be passed to ShoppingListItem component
  const completeItem = (id) => {
    let updatedItems = items.map((item) => {
      if (item.id === id) {
        /* toggles isPurchased between true and false */
        item.isPurchased = !item.isPurchased;
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
        updateItem={updateItem}
        addToFridge={addToFridge}
      />
    </div>
  );
}

export default ShoppingList;
