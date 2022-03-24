import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShoppingListForm from "./ShoppingListForm";
import ShoppingListItem from "./ShoppingListItem";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import swal from "sweetalert";

function ShoppingList() {
  //Variable that the grocery list id based on dynamic URL
  const { id } = useParams();

  //the state items in format: [ {id: #, text: string, isPurchased: boolean }, ...]
  const [items, setItems] = useState([]);

  //State to keep track if user is editing(updating) an existing grocery list item or not
  const [editMode, setEditMode] = useState(false);

  const [groceryTitle, setGroceryTitle] = useState([]);

  //To be used to navigate user to main (Fridge) page after deleting a shopping list
  const navigate = useNavigate();

  useEffect(() => {
    getPreviousItems();
    getGroceryListsData();
  }, [id]);

  const getPreviousItems = () => {
    axios
      .get(`/api/grocery_lists/${id}`, { withCredentials: true })
      .then((res) => {
        const results = [];
        res.data.forEach((data, index) => {
          results.unshift({
            id: data.id,
            text: data.name,
            isPurchased: data.obtained,
          });
        });
        setItems([...results]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroceryListsData = () => {
    axios
      .get(`/api/grocery_lists`, {
        withCredentials: true,
      })
      .then((results) => {
        const listTitle = results.data.filter((list) => list.id == id);
        setGroceryTitle(listTitle[0].name);
      })
      .catch((err) => console.log(err));
  };

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
      .post(`/api/grocery_lists/${id}`, {
        name: item.text,
        grocery_list_id: id,
        obtained: false,
      },
      { withCredentials: true })
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
    //Block user from submitting an empty value
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
          .put(`/api/grocery_items/${itemId}`, {
            name: newValue.text,
            obtained: item.isPurchased,
          },
          { withCredentials: true })
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
      .delete(`/api/grocery_items/${id}`, { withCredentials: true })
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
          .put(`/api/grocery_items/${id}`, {
            name: item.text,
            obtained: item.isPurchased,
          },
          { withCredentials: true })
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

  const deleteGroceryList = () => {
    swal({
      title: "Are you sure you want to delete this grocery list?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        axios
          .delete(`/api/grocery_lists/`, {
            data: { id },
          },
          { withCredentials: true })
          .then(() => navigate(`/fridge`))
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

  return (
    <div>
      <div className="list-header">
        <TiDelete
          className="delete-grocery-list"
          size={35}
          onClick={deleteGroceryList}
          opacity={0.7}
        />
      </div>

      <h1 className="grocery-title">{groceryTitle} List</h1>
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
