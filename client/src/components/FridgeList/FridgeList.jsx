import FridgeCard from "../FridgeCard/";

function FridgeList(props) {
  const parsedItems = props.items.map((item) => <FridgeCard item={item} key={item.id}/>);

  return (
    <>
      <div className="fridge-list">
        {parsedItems.length > 0 ? parsedItems : <h3>No results found</h3>}
      </div>
    </>
  )
}

export default FridgeList
