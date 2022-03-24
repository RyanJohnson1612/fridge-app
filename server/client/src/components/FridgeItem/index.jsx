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
  const [queryId, setQueryId] = useState(props.id || id)

  useEffect(() => {

    axios.get(`/api/fridge_items/${queryId}`, { withCredentials: true })
      .then((results) => {
        setFridgeItem(results.data);
      })
      .catch(error => console.log(`Error: ${error.message}`));

    axios.get(`/api/grocery_lists`, { withCredentials: true })
      .then((results) => {
        const groceries = results.data;
        setAllGroceryLists(groceries);
        setGroceryList(groceries[0].id);
      })
      .catch(err => console.log(err));

  }, []);

  const unauthorized = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
          closeModal={props.closeModal}
          modalId={props.id}
        />
      ) :
      <div>
        { loading && <div className="spinning"><Spinner animation="border" variant="secondary" /></div>}
        {unauthorized()}
        { !loading && <h4 className="unauthorized">This page doesn't exist, or you are unauthorized to view this page.</h4> }
      </div>}
    </div>
  );
}

export default FridgeItemIndex;
