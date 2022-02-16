import { useState } from 'react';
import { debounce } from '../../helpers/helpers';
import { BiSearch } from 'react-icons/bi';
import './SearchBar.scss';

function SearchBar(props) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.currentTarget.value);
    debounce(props.onSearch(search), 40000);
  }

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder={props.placeholder || 'Search'}
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <BiSearch className="search-bar__icon" onClick={() => props.onSearch(search)}/>
    </div>
  )
}

export default SearchBar;
