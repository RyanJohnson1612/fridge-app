import { useState, useEffect, useRef } from "react";
import { createQueryString, decodeQueryString } from '../../helpers/helpers';
import { useSearchParams, useLocation } from "react-router-dom";
import axios from 'axios';

function useFridgeSearch() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    search: null,
    category: [],
    status: [],
  });
  const [checkboxVisible, setCheckboxVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const firstUpdate = useRef(true);


  const handleSearch = (search) => {
    setFilters(prev => ({...prev, search}));
  }

  const handleSelect = (values, filter) => {
    setFilters(prev => ({...prev, [filter]: values}));
  }

  const selectIngredients = () => {
    setCheckboxVisible(prev => !prev);
  }

  const setFiltersFromParams = () => {
    if (location.search) {
      const searchParams = decodeQueryString(location.search);
      setFilters(searchParams);
    }
  }

  const searchFridge = () => {
    const queryString = createQueryString(filters);
    setSearchParams(queryString);

    axios.get(`/api/fridges${queryString}`, {withCredentials: true})
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    setFiltersFromParams();
  }, []);

  useEffect(() => {
    if(firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    searchFridge();
  }, [filters]);

  return { items, filters, handleSearch, handleSelect, checkboxVisible, selectIngredients, loading}
}

export default useFridgeSearch;
