import { useState } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import CheckList from "../CheckList/CheckList";
import { BsSliders } from "react-icons/bs";
import { Button } from "react-bootstrap";
import classNames from 'classnames';

function FridgeFilters(props) {
  const [dropdown, setDropdown] = useState(false);

  const dropdownClasses = classNames(
    "fridge-filters__dropdown",
    dropdown ? "fridge-filters__dropdown--open" : "fridge-filters__dropdown--closed"
  );

  return (
    <div className="fridge-filters">
      <h2 className="fridge-filters__header--mobile">My Fridge</h2>
      <h2>Filters</h2>
      <div>
        <SearchBar
          filters={props.filters}
          placeholder="Search Fridge"
          onSearch={props.onSearch}
        />
        <Button className="fridge-filters__button" onClick={() => setDropdown(true)}>
          <BsSliders />
        </Button>
      </div>
      <div className={dropdownClasses}>
        <h2 className="fridge-filters__header--mobile">Filters</h2>
        <h3>Categories</h3>
        <CheckList
          filters={props.filters}
          options={['Fruit', 'Vegetable', 'Dairy', 'Grain', 'Meat', 'Seafood', 'Alternative Protein', 'Dessert', 'Condiments', 'Other']}
          filter="category"
          onSelect={props.onSelect}
        />
        <h3>Status</h3>
        <CheckList
          filters={props.filters}
          options={['fresh', 'expiring soon', 'expired']}
          filter="status"
          onSelect={props.onSelect}
        />

        <Button className="fridge-filters__apply-button" onClick={() => setDropdown(false)}>Apply Filters</Button>
      </div>
    </div>
  )
}

export default FridgeFilters;
