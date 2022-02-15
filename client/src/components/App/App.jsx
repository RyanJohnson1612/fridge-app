import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import MealIdeas from "../Meal-Ideas";

function App() {
  return (
    <div className="App">
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

      <div className="content">
        <MealIdeas />
      </div>
    </div>
  );
}

export default App;
