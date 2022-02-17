
import React, { useState, useEffect } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Navbar from '../Navbar/'
import FridgeIndex from '../FridgeIndex';
import FridgeItemIndex from '../FridgeItem';
import ShoppingListIndex from "../ShoppingList";
import Login from '../Login/';
import Register from '../Register/';
import AddFridgeItemIndex from '../AddFridgeItem';
import MealIdeas from '../Meal-Ideas';

function App() {

  return (
    <main className="App">
      <Router>
        <Navbar />
        <section className="content">
          <Routes>

            <Route path="/" element={<FridgeItemIndex />} />
            <Route
              path="/fridge"
              element={
                <ProtectedRoute redirectTo="/login" message="Please login or register to view your fridge">
                  <FridgeIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/grocery-list"
              element={
                <ProtectedRoute redirectTo="/login" message="Please login or register to view your grocery lists">
                  <ShoppingListIndex />
                </ProtectedRoute>
              }
            />
            <Route path="/fridge-item/new" element={<AddFridgeItemIndex />} />
            <Route path="/recipes" element={<h1><MealIdeas /></h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </section>
      </Router>
    </main>
  );
}

export default App;
