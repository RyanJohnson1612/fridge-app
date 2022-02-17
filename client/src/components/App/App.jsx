import React, { useState, useEffect } from 'react';
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Navbar from '../Navbar/'
import FridgeItem from '../FridgeItem/FridgeItem';
import ShoppingListIndex from "../ShoppingList";
import Login from '../Login/';
import Register from '../Register/';
import axios from 'axios'

function App() {
  const [fridgeItem, setFridgeItem] = useState({});
  const [groceryList, setGroceryList] = useState(1);
  const [allGroceryLists, setAllGroceryLists] = useState([]);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/fridge_items/7`)
      .then((results) => {
        const item = results.data[0]
        if (JSON.stringify(fridgeItem) !== JSON.stringify(item)) {
          setFridgeItem(item);
        }
      })
      .catch(error => console.log(`Error: ${error.message}`));

    axios.get(`${process.env.REACT_APP_API_URL}/grocery_lists`)
      .then((results) => {
        console.log(results);
        setAllGroceryLists(results.data);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <main className="App">
      <Router>
        <Navbar />
        <section className="content">
          <Routes>
           <Route path="/" element={ (!fridgeItem.date_removed && fridgeItem) && (
            <FridgeItem
              key={fridgeItem.id}
              // id={fridgeItem.id}
              // name={fridgeItem.name}
              // dateStored={fridgeItem.date_stored}
              // expiry={fridgeItem.expiry}
              // category={fridgeItem.category}
              // image={fridgeItem.image_url}
              // notes={fridgeItem.notes}
              // expireIn={fridgeItem.expire_in}
              // storedSince={fridgeItem.stored_since}
              // dateRemoved={fridgeItem.date_removed}
              fridgeItem={fridgeItem}
              setFridgeItem={setFridgeItem}
              setGroceryList={setGroceryList}
              groceryList={groceryList}
              allGroceryLists={allGroceryLists}
            />
            )} />
            <Route path="/fridge" element={<h1>Fridge Index</h1>} />
            <Route path="/grocery-list" element={
              <ProtectedRoute redirectTo="/login" message="Please login or register to view your grocery lists">
                <ShoppingListIndex />
              </ProtectedRoute>
              } />
            <Route path="/recipes" element={<h1>Recipes Index</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </section>



      </Router>
    </main>
  );
}

export default App;
