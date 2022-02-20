import FridgeCard from "../FridgeCard/";

const handleChecked = (item) => {
  console.log(item);
}

function FridgeList(props) {
  const parsedItems = props.items.map((item) => <FridgeCard item={item} key={item.id} onChecked={handleChecked} />);

  return (
    <div className="fridge-list">
      {parsedItems.length > 0 ? parsedItems : <h3>No results found</h3>}
    </div>
  )
}

export default FridgeList
