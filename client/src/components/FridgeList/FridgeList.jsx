import FridgeCard from "../FridgeCard/";

function FridgeList(props) {
  const parsedItems = props.items.map((item) => <FridgeCard item={item} key={item.id}/>);

  return (
    <>
      <div className="fridge-list">
        {parsedItems}
      </div>
    </>
  )
}

export default FridgeList
