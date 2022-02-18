import { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import CheckList from "../CheckList/CheckList";
import RangeSlider from "../RangeSlider/RangeSlider";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs"
import classNames from 'classnames';

function FridgeFilters(props) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownClasses = classNames(
    "fridge-filters__dropdown",
    dropdown ? "fridge-filters__dropdown--open" : "fridge-filters__dropdown--closed"
  )

  return (
    <div className="fridge-filters">
      <h2>Filters</h2>
      <SearchBar
        placeholder="Search Fridge"
        onSearch={props.onSearch}
      />
      <div className={dropdownClasses}>
        <h3>Categories</h3>
        <CheckList
          options={['fruit', 'vegetable', 'dairy', 'meat', 'seafood', 'drinks', 'condiments', 'other']}
          filter="category"
          onSelect={props.onSelect}
        />
        <h3>Status</h3>
        <CheckList
          options={['fresh', 'expiring soon', 'expired']}
          filter="status"
          onSelect={props.onSelect}
        />
        <h3>Days until expired</h3>
        <RangeSlider onRange={props.onRange}/>

        <div className="fridge-filters__button" onClick={() => setDropdown(false)}>
          <span>Less Filters</span>
          <BsChevronCompactUp className="fridge-filters__button-icon" />
        </div>
      </div>

        <div className="fridge-filters__button" onClick={() => setDropdown(true)}>
          <span>More Filters</span>
          <BsChevronCompactDown className="fridge-filters__button-icon" />
        </div>

    </div>
  )
}

export default FridgeFilters;
