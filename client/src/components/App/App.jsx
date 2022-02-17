import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Navbar from '../Navbar/'
import FridgeItemIndex from '../FridgeItem';
import ShoppingListIndex from "../ShoppingList";
import Login from '../Login/';
import Register from '../Register/';
import AddFridgeItemIndex from '../AddFridgeItem';
import MealIdeas from '../Meal-Ideas';
import axios from 'axios';

axios.defaults.withCredentials = false;

function App() {

  return (
    <main className="App">
      <Router>
        <Navbar />
        <section className="content">
          <Routes>

            <Route path="/" element={<FridgeItemIndex />} />
            <Route path="/fridge" element={<h1>Fridge Index</h1>} />

            <Route path="/grocery-list" element={
              // <ProtectedRoute redirectTo="/login" message="Please login or register to view your grocery lists">
                <ShoppingListIndex />
              // </ProtectedRoute>
              } />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fridge-item/new" element={<AddFridgeItemIndex />} />
            <Route path="/recipes" element={<h1><MealIdeas /></h1>} />
          </Routes>
        </section>
      </Router>
    </main>
  );
}

export default App;
