import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavDropdown } from 'react-bootstrap';

export default function GroceryListDropdown(props) {

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

  //Have to acheive format: <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
  const groceryListsMapped = allGroceryLists.map((groceryList, index) => (
    <NavDropdown.Item key={index} href={`/grocery-list/${groceryList.id}`}> {groceryList.name} </NavDropdown.Item>
  ));

  return (
    <div>{groceryListsMapped}</div>
  )
}
