import React, { useState, useEffect } from 'react';
import FridgeItem from '../FridgeItem/FridgeItem';
import './App.scss';
import axios from 'axios'

function App() {

  const [food, setFood] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/food/6`)
      .then((results) => {
        const food = results.data[0]
        console.log(food);
        setFood(food);
      }).catch(error => console.log(`Error: ${error.message}`));
  }, []);

  return (
    <div className="App">
      <p>Fridge App (Name WIP)</p>
      <FridgeItem
        key={food.id}
        name={food.name}
        dateStored={food.date_stored}
        expiry={food.expiry}
        category={food.category}
        image={food.image_url}
        notes={food.notes}
      />
    </div>
  );
}

export default App;
