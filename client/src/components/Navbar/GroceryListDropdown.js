import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { NavDropdown } from 'react-bootstrap';

export default function GroceryListDropdown({setAllGroceryLists, allGroceryLists, onClick}) {

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/grocery_lists`, { withCredentials: true })
      .then((results) => {
        setAllGroceryLists(results.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Have to acheive format: <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
  const groceryListsMapped = allGroceryLists.map((groceryList, index) => (
    <NavDropdown.Item as={Link} key={index} to={`/grocery-lists/${groceryList.id}`} onClick={() => onClick(false)}> {groceryList.name} </NavDropdown.Item>
  ));

  return (
    <div>{groceryListsMapped}</div>
  )
}
