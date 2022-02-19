import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createQueryString, decodeQueryString } from '../../helpers/helpers';
import { useSearchParams, useLocation } from "react-router-dom";
import FridgeList from "../FridgeList/";
import FridgeFilters from "../FridgeFilters/";
import axios from 'axios';

function FridgeIndex() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    search: null,
    category: [],
    status: [],
    // expiresIn: [],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const firstUpdate = useRef(true);


  const handleSearch = (search) => {
    setFilters(prev => ({...prev, search}));
  }

  const handleSelect = (values, filter) => {
    setFilters(prev => ({...prev, [filter]: values}));
  }

  // const handleRange = (values) => {
  //   setFilters(prev => ({...prev, expiresIn: values}));
  // }

  const sendSearchParamsProps = () => {
    if (location.search) {
      const searchParams = decodeQueryString(location.search);
      setSearchParams(searchParams);
      setFilters(searchParams);
    }
  }

  const searchFridge = () => {
    const queryString = createQueryString(filters);
    setSearchParams(queryString);

    axios.get(`${process.env.REACT_APP_API_URL}/api/fridges${queryString}`, {withCredentials: true})
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    sendSearchParamsProps();
  }, []);

  useEffect(() => {
    if(firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    searchFridge();
  }, [filters]);


  return (
    <section className="fridge-index">
      <aside className="fridge-index__sidebar">
        <FridgeFilters
          filters={filters}
          onSearch={handleSearch}
          onSelect={handleSelect}
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
