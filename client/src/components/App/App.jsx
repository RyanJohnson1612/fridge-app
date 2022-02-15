import React, { useState, useEffect } from "react";
import FridgeItem from "../FridgeItem/FridgeItem";
import ShoppingList from "../ShoppingList/ShoppingList";
import axios from "axios";
import { Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [fridgeItem, setFridgeItem] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/fridge_items/7`)
      .then((results) => {
        const item = results.data[0];
        console.log(item);

        if (JSON.stringify(fridgeItem) !== JSON.stringify(item)) {
          setFridgeItem(item);
        }
      })
      .catch((error) => console.log(`Error: ${error.message}`));
  }, [fridgeItem]);

  return (
    <Router>
      <div className="App">
        <Navbar bg="myTeal" variant="dark" fixed="top" expand="sm">
          <Navbar.Brand href="/">FridgeApp</Navbar.Brand>
          <Navbar.Toggle />
          <NavbarCollapse>
            <Nav>
              <Nav.Link as={Link} to="/fridge">
                MyFridge
              </Nav.Link>
              <Nav.Link as={Link} to="/grocery-list">
                Grocery List
              </Nav.Link>
              <Nav.Link as={Link} to="/recipes">
                Recipe Ideas
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Navbar>

        <div className="content">
          <Routes>
            <Route path="/fridge" element={<h1>Fridge Index</h1>} />
            <Route path="/grocery-list" element={<ShoppingList />} />
            <Route path="/recipes" element={<h1>Recipes Index</h1>} />
          </Routes>

          {!fridgeItem.date_removed && fridgeItem && (
            <FridgeItem
              key={fridgeItem.id}
              id={fridgeItem.id}
              name={fridgeItem.name}
              dateStored={fridgeItem.date_stored}
              expiry={fridgeItem.expiry}
              category={fridgeItem.category}
              image={fridgeItem.image_url}
              notes={fridgeItem.notes}
              expireIn={fridgeItem.expire_in}
              storedSince={fridgeItem.stored_since}
              dateRemoved={fridgeItem.date_removed}
              setFridgeItem={setFridgeItem}
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
