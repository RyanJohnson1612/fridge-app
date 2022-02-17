import React from 'react';
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../Navbar/'
import FridgeItemIndex from '../FridgeItem';
import ShoppingListIndex from "../ShoppingList";
import Login from '../Login/';
import Register from '../Register/';
import AddFridgeItemIndex from '../AddFridgeItem';

function App() {

  return (
    <main className="App">
      <Router>
        <Navbar />
        <section className="content">
          <Routes>
            <Route path="/" element={<FridgeItemIndex />} />
            <Route path="/fridge" element={<h1>Fridge Index</h1>} />
            <Route path="/grocery-list" element={<ShoppingListIndex />} />
            <Route path="/recipes" element={<h1>Recipes Index</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fridge-item/new" element={<AddFridgeItemIndex />} />
          </Routes>
        </section>
      </Router>
    </main>
  );
}

export default App;
