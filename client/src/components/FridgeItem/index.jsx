import React, { useState, useEffect } from "react";
import FridgeItem from "./FridgeItem";
import "./FridgeItem.scss";
import axios from 'axios'

function FridgeItemIndex(props) {

  const [fridgeItem, setFridgeItem] = useState({});
  const [groceryList, setGroceryList] = useState(1);
  const [allGroceryLists, setAllGroceryLists] = useState([]);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/fridge_items/7`)
      .then((results) => {
        const item = results.data[0]
        if (JSON.stringify(fridgeItem) !== JSON.stringify(item)) {
          setFridgeItem(item);
        }
      })
      .catch(error => console.log(`Error: ${error.message}`));

    axios.get(`${process.env.REACT_APP_API_URL}/grocery_lists`)
      .then((results) => {
        console.log(results);
        setAllGroceryLists(results.data);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <div>
      {(!fridgeItem.date_removed && fridgeItem) && (<FridgeItem
        key={fridgeItem.id}
        // id={fridgeItem.id}
        // name={fridgeItem.name}
        // dateStored={fridgeItem.date_stored}
        // expiry={fridgeItem.expiry}
        // category={fridgeItem.category}
        // image={fridgeItem.image_url}
        // notes={fridgeItem.notes}
        // expireIn={fridgeItem.expire_in}
        // storedSince={fridgeItem.stored_since}
        // dateRemoved={fridgeItem.date_removed}
        fridgeItem={fridgeItem}
        setFridgeItem={setFridgeItem}
        setGroceryList={setGroceryList}
        groceryList={groceryList}
        allGroceryLists={allGroceryLists}
      />)}
    </div>
  );
}

export default FridgeItemIndex;
