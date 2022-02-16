import { useState, useEffect } from "react";
import FridgeCard from "../FridgeCard/";
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

  const parsedItems = items.map((item) => <FridgeCard item={item} key={item.id}/>);

  return (
    <section className="fridge-index">
      {parsedItems}
    </section>
  )
}

export default FridgeIndex;
