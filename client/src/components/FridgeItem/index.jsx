import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FridgeItem from "./FridgeItem";
import "./FridgeItem.scss";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function FridgeItemIndex(props) {
  const { id } = useParams();
  const [fridgeItem, setFridgeItem] = useState({});
  const [groceryList, setGroceryList] = useState(1);
  const [allGroceryLists, setAllGroceryLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/fridge_items/${id}`, { withCredentials: true })
      .then((results) => {
        console.log(results.data);
        // use this one if you wanna see the ketchup camel with all fields filled
        setFridgeItem(results.data);
        // use this one if you want to see most recent add to fridge item
        // const item = results.data[results.data.length - 1];

        // if (JSON.stringify(fridgeItem) !== JSON.stringify(item)) {
        //   setFridgeItem(item);
        // }
      })
      .catch(error => console.log(`Error: ${error.message}`));

    axios.get(`${process.env.REACT_APP_API_URL}/grocery_lists`, { withCredentials: true })
      .then((results) => {
        console.log(results);
        setAllGroceryLists(results.data);
      })
      .catch(err => console.log(err));

  }, []);

  const unauthorized = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <div>
      {(!fridgeItem.date_removed && fridgeItem.id) ? (
        <FridgeItem
          key={fridgeItem.id}
          fridgeItem={fridgeItem}
          setFridgeItem={setFridgeItem}
          setGroceryList={setGroceryList}
          groceryList={groceryList}
          allGroceryLists={allGroceryLists}
        />
      ) :
      <div>
        { loading && <div className="spinning"><Spinner animation="border" variant="secondary" /></div>}
        {unauthorized()}
        { !loading && <h2 className="unauthorized">This page doesn't exist, or you are unauthorized to view this page.</h2> }
      </div>}
    </div>
  );
}

export default FridgeItemIndex;
