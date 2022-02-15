import React, { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";
import { RiCloseCircleLine, RiFridgeLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import axios from "axios";
function ShoppingListItem(props) {
  const { items, completeItem, removeItem, updateItem, addToFridge } = props;

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateItem(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const testAxiosGet = () => {
    axios
      .get(`http://localhost:8080/grocery_lists/3`)
      .then((res) => {
        res.data.forEach((data, index) => {
          console.log("index", index);
        });
        console.log("Get grocery list 3:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  testAxiosGet();

  /*  If state variable edit.id is true (which occurs after edit icon is clicked),
  return ShoppingListForm while passing submitUpdate function onSubmit */
  if (edit.id) {
    return <ShoppingListForm onSubmit={submitUpdate} />;
  }
  const itemsMapped = items.map((item, index) => (
    // class of item is assigned based on whether item was purchased or not
    <div
      className={item.isPurchased ? "item-row complete" : "item-row"}
      key={index}
    >
      {/* keep track of which item is being clicked on */}
      <div key={item.id} onClick={() => completeItem(item.id)}>
        {item.text}
      </div>

      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeItem(item.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: item.id, value: item.text })}
          className="edit-icon"
        />
        <RiFridgeLine
          onClick={() => addToFridge(item.id)}
          className="fridge-icon"
        />
      </div>
    </div>
  ));

  return [...itemsMapped];
}
export default ShoppingListItem;
