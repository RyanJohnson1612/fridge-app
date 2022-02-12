import React, { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function ShoppingListItem() {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  return items.map((item, index) => (
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
        <RiCloseCircleLine />
        <TiEdit />
      </div>
    </div>
  ));
}

export default ShoppingListItem;

{
  /* Function to check if item has been purchased or not */
}
