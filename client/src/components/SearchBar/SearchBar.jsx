import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import './SearchBar.scss';

function SearchBar(props) {
  const [search, setSearch] = useState('');

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder={props.placeholder || 'Search'}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <BiSearch className="search-bar__icon" onClick={() => props.onSearch(search)}/>
    </div>
  )
}

export default SearchBar;
