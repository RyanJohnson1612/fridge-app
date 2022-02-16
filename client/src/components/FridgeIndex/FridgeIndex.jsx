import { useState, useEffect } from "react";
import FridgeList from "../FridgeList/";
import FridgeFilters from "../FridgeFilters/";
import axios from 'axios';
axios.defaults.withCredentials = true;

function FridgeIndex() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    search: null,
    categories: [],
    status: [],
    days: null
  })

  const handleSearch = (search) => {
    setFilters(prev => ({...prev, search}));
  }

  const handleSelect = (values, filter) => {
    setFilters(prev => ({...prev, [filter]: values}));
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/fridges`)
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.log(err));
  }, [filters]);


  return (
    <section className="fridge-index">
      <FridgeFilters onSearch={handleSearch} onSelect={handleSelect}/>
      <FridgeList items={items} />
    </section>
  )
}

export default FridgeIndex;
