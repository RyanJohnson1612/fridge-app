import React, { useContext } from "react";
import ShoppingList from "./ShoppingList";
import "./ShoppingList.scss";
import { authContext } from "../../providers/AuthProvider";

function ShoppingListIndex() {
  const { user } = useContext(authContext);
  console.log(user);
  return (
    <div className="shopping-list">
      <ShoppingList />
    </div>
  );
}

export default ShoppingListIndex;
