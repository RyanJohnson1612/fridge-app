import React, { useState, useEffect } from 'react';
import FridgeItem from '../FridgeItem/FridgeItem';
import './App.scss';
import axios from 'axios'
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

function App() {

  const [fridgeItem, setFridgeItem] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/fridge_items/10`)
      .then((results) => {
        const fridgeItem = results.data[0]
        console.log(fridgeItem);
        setFridgeItem(fridgeItem);
      }).catch(error => console.log(`Error: ${error.message}`));
  }, []);

  return (
    <div className="App">
      <p>Fridge App (Name WIP)</p>
      <Navbar bg="myTeal" variant="dark" fixed="top" expand="sm">
        <Navbar.Brand href="/">FridgeApp</Navbar.Brand>
        <Navbar.Toggle />
        <NavbarCollapse>
          <Nav>
            <Nav.Link href="/"> MyFridge</Nav.Link>
            <Nav.Link href="/"> Grocery List</Nav.Link>
            <Nav.Link href="/"> Meal Ideas</Nav.Link>
          </Nav>
        </NavbarCollapse>
      </Navbar>

      <div className="content">Placeholder content...</div>
      <FridgeItem
        key={fridgeItem.id}
        name={fridgeItem.name}
        dateStored={fridgeItem.date_stored}
        expiry={fridgeItem.expiry}
        category={fridgeItem.category}
        image={fridgeItem.image_url}
        notes={fridgeItem.notes}
        expireIn={fridgeItem.expire_in}
        storedSince={fridgeItem.stored_since}
        dateRemoved={fridgeItem.date_removed}
      />
    </div>
  );
}

export default App;
