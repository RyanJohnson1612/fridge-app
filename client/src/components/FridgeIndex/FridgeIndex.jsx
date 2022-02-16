import { useState, useEffect } from "react";
import FridgeList from "../FridgeList/";
import FridgeFilters from "../FridgeFilters/";
import axios from 'axios';
axios.defaults.withCredentials = true;

function FridgeIndex() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/fridges`)
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <section className="fridge-index">
      <FridgeFilters />
      <FridgeList items={items} />
    </section>
  )
}

export default FridgeIndex;
