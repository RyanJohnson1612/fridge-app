import { useState, useEffect } from "react";
import { createQueryString, decodeQueryString } from '../../helpers/helpers';
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

  const handleSearch = async (search) => {
    setFilters(prev => ({...prev, search}));
  }

  const handleSelect = (values, filter) => {
    setFilters(prev => ({...prev, [filter]: values}));
  }

  const searchFridge = () => {
    const queryString = createQueryString(filters);
    window.history.replaceState(window.location.href, '', queryString);
    axios.get(`${process.env.REACT_APP_API_URL}/api/fridges${queryString}`)
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    searchFridge();
  }, [filters]);


  return (
    <section className="fridge-index">
      <aside className="fridge-index__sidebar">
        <FridgeFilters onSearch={handleSearch} onSelect={handleSelect}/>
      </aside>
      <div className="fridge-index__content">
        <h1>My Fridge</h1>
        <FridgeList items={items} />
      </div>
    </section>
  )
}

export default FridgeIndex;
