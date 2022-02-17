import SearchBar from "../SearchBar/SearchBar";
import CheckList from "../CheckList/CheckList";

function FridgeFilters(props) {
  return (
    <div className="fridge-filters">
      <h2>Filters</h2>
      <SearchBar
        placeholder="Search Fridge"
        onSearch={props.onSearch}
      />
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
    </div>
  )
}

export default FridgeFilters;
