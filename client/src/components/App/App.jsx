import React, { useState, useEffect } from 'react';
import FridgeItem from '../FridgeItem/FridgeItem';
import './App.scss';
import axios from 'axios'

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
