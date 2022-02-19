import FridgeList from "../FridgeList/";
import FridgeFilters from "../FridgeFilters/";
import useFridgeSearch from "../../hooks/useFridgeSearch/useFridgeSearch";

function FridgeIndex() {
  const { items, filters, handleSearch, handleSelect } = useFridgeSearch();

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
