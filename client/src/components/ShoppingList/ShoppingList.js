import React, { useState, useEffect } from "react";
import ShoppingListForm from "./ShoppingListForm";
import ShoppingListItem from "./ShoppingListItem";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

function ShoppingList() {
  const { id } = useParams();

  //the state items in format: [ {id: #, text: string, isPurchased: boolean }, ...]
  const [items, setItems] = useState([]);
  //State to keep track if user is editing(updating) an existing grocery list item or not
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPreviousItems();
  }, []);

  //Function to add items to shopping list, will be passed to ShoppingListForm
  const addItem = (item) => {
    if (!item.text || /^\s*$/.test(item.text)) {
      return swal(
        "Oops!",
        "You can't add an empty item to your shopping list. Please try again.",
        "error"
      );
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/grocery_lists/1`, {
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
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return swal(
        "Oops!",
        "You can't edit an item to be an emply value.",
        "error"
      );
    }

    items.forEach((item) => {
      if (item.id === itemId) {
        axios
          .put(`${process.env.REACT_APP_API_URL}/grocery_items/${itemId}`, {
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

    setItems((prev) =>
      //if the item.id matches, set it to newValue, otherwise set it back to item
      prev.map((item) =>
        item.id === itemId
          ? { id: itemId, text: newValue.text, isPurchased: false }
          : item
      )
    );
  };

  //Function to remove item from shopping list,will be passed to ShoppingListItem component
  const removeItem = (id) => {
    //Check items array for target item in order to remove it (filter it out)
    const removeArr = [...items].filter((item) => item.id !== id);

    setItems(removeArr);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/grocery_items/${id}`)
      .catch((err) => {
        console.log(err);
        swal(
          "Oops!",
          "There was an error with your request. Please try again in a few minutes.",
          "error"
        );
      });
  };

  //Function to toggle item as completed or not, will be passed to ShoppingListItem component
  const completeItem = (id) => {
    let updatedItems = items.map((item) => {
      if (item.id === id) {
        /* toggles isPurchased between true and false */
        item.isPurchased = !item.isPurchased;
        axios
          .put(`${process.env.REACT_APP_API_URL}/grocery_items/${id}`, {
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
      .get(`${process.env.REACT_APP_API_URL}/grocery_lists/${id}`)
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
      <h1 class="grocery-title"> My Grocery List</h1>

      {!editMode && <ShoppingListForm editMode={editMode} onSubmit={addItem} />}

      <ShoppingListItem
        items={items}
        completeItem={completeItem}
        removeItem={removeItem}
        updateItem={updateItem}
        setEditMode={setEditMode}
        editMode={editMode}
      />
    </div>
  );
}

export default ShoppingList;
