import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="myTeal" variant="dark" fixed="top">
        <Navbar.Brand href="/">FridgeApp</Navbar.Brand>
      </Navbar>
      <div className="content">Placeholder content...</div>
    </div>
  );
}

export default App;
