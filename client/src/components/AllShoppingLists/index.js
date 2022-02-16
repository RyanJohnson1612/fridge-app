import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllShoppingListsIndex() {
  const [allGroceryLists, setAllGroceryLists] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/grocery_lists`)
      .then((results) => {
        console.log(results);
        setAllGroceryLists(results.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(allGroceryLists);

  return <div>index</div>;
}
