import React, { useState, useEffect } from "react";
import ShoppingListForm from "./ShoppingListForm";
import ShoppingListItem from "./ShoppingListItem";
import axios from "axios";
import swal from "sweetalert";

function ShoppingList() {
  //the state items in format: [ {id: #, text: string, isPurchased: boolean }, ...]
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPreviousItems();
  }, []);

  //Function to add items to shopping list, will be passed to ShoppingListForm
  const addItem = (item) => {
    axios
      .post("http://localhost:8080/grocery_lists/1", {
        name: item.text,
        grocery_list_id: 3,
        obtained: false,
      })
      .then((res) => {
        const newItems = [
          {
            id: res.data.id,
            text: res.data.name,
            isPurchased: res.data.obtained,
          },
          ...items,
        ];
        setItems(newItems);
      })
      .catch((err) => {
        console.log(err);
        swal(
          "Oops!",
          "There was an error with your request. Please try again in a few minutes.",
          "error"
        );
      });
  };

  //Function to update item in shopping list, will be passed to ShoppingListItem component
  const updateItem = (itemId, newValue) => {
    setItems((prev) =>
      //if the item.id matches, set it to newValue, otherwise set it back to item
      prev.map((item) =>
        item.id === itemId
          ? { id: itemId, text: newValue.text, isPurchased: item.isPurchased }
          : item
      )
    );

    items.forEach((item) => {
      if (item.id === itemId) {
        axios
          .put(`http://localhost:8080/grocery_items/${itemId}`, {
            name: newValue.text,
            obtained: item.isPurchased,
          })
          .then(() => {})
          .catch((err) => {
            console.log(err);
            swal(
              "Oops!",
              "There was an error with your request. Please try again in a few minutes.",
              "error"
            );
          });
      }
    });
  };

  //Function to remove item from shopping list,will be passed to ShoppingListItem component
  const removeItem = (id) => {
    //Check items array for the target item, and filter it out to remove
    const removeArr = [...items].filter((item) => item.id !== id);

    setItems(removeArr);
    axios.delete(`http://localhost:8080/grocery_items/${id}`).catch((err) => {
      console.log(err);
      swal(
        "Oops!",
        "There was an error with your request. Please try again in a few minutes.",
        "error"
      );
    });
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
        axios
          .put(`http://localhost:8080/grocery_items/${id}`, {
            name: item.text,
            obtained: item.isPurchased,
          })
          .then(() => {})
          .catch((err) => {
            console.log(err);
            swal(
              "Oops!",
              "There was an error with your request. Please try again in a few minutes.",
              "error"
            );
          });
      }
      return item;
    });
    setItems(updatedItems);
  };

  const getPreviousItems = () => {
    axios
      .get(`http://localhost:8080/grocery_lists/3`)
      .then((res) => {
        const results = [];
        res.data.forEach((data, index) => {
          results.unshift({
            id: data.id,
            text: data.name,
            isPurchased: data.obtained,
          });
        });
        setItems([...items, ...results]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1> My Grocery List</h1>

      {!editMode && <ShoppingListForm editMode={editMode} onSubmit={addItem} />}

      <ShoppingListItem
        editMode={editMode}
        items={items}
        completeItem={completeItem}
        removeItem={removeItem}
        updateItem={updateItem}
        addToFridge={addToFridge}
        setEditMode={setEditMode}
      />
    </div>
  );
}

export default ShoppingList;
