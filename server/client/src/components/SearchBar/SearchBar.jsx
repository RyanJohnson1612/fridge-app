import { useState, useEffect, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import debounce from 'lodash.debounce'
import './SearchBar.scss';

function SearchBar(props) {
  const [search, setSearch] = useState('');

  const debounceSearch = useCallback(debounce((value) => props.onSearch(value), 300), [])

  useEffect(() => {
    if(props.filters.search) {
      setSearch(props.filters.search)
    }
  }, [props.filters]);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearch(value);
    debounceSearch(value);
  }

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder={props.placeholder || 'Search'}
        value={search}
        onChange={handleInput}
      />
      <BiSearch className="search-bar__icon" onClick={() => props.onSearch(search)}/>
    </div>
  )
}

export default SearchBar;
