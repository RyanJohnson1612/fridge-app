import { useState, useEffect } from "react";
import { createQueryString, decodeQueryString } from '../../helpers/helpers';
import FridgeList from "../FridgeList/";
import FridgeFilters from "../FridgeFilters/";
import axios from 'axios';

function FridgeIndex() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    search: null,
    category: [],
    status: [],
    expiresIn: [],
  })

  const handleSearch = (search) => {
    setFilters(prev => ({...prev, search}));
  }

  const handleSelect = (values, filter) => {
    setFilters(prev => ({...prev, [filter]: values}));
  }

  const handleRange = (values) => {
    setFilters(prev => ({...prev, expiresIn: values}));
  }

  const searchFridge = () => {
    const queryString = createQueryString(filters);
    window.history.replaceState(window.location.href, '', queryString);
    axios.get(`${process.env.REACT_APP_API_URL}/api/fridges${queryString}`, {withCredentials: true})
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
        <FridgeFilters
          onSearch={{handleRange, handleSelect, handleSearch}}
        />
      </aside>
      <div className="fridge-index__content">
        <h1>My Fridge</h1>
        <FridgeList items={items} />
      </div>
    </section>
  )
}

export default FridgeIndex;
