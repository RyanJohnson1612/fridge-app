import { useState, useEffect, useContext } from "react";
import { authContext } from '../../providers/AuthProvider';
import axios from 'axios';
axios.defaults.withCredentials = true;

function FridgeIndex() {
  const { user } = useContext(authContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/fridges/${user.id}/fridge`)
      .then(res => {
        console.log(res)
        setItems(res.data);
      })
  }, [])

  return (
    <section className="fridge-index">
      {/* {items} */}
    </section>
  )
}

export default FridgeIndex;
