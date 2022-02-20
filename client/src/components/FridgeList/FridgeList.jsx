import FridgeCard from '../FridgeCard/';
import { Button } from 'react-bootstrap'
import useCheckList from '../../hooks/useCheckList/useCheckList';

function FridgeList(props) {
  const { selected, handleCheck } = useCheckList();

  const parsedItems = props.items.map((item) => <FridgeCard item={item} key={item.id} onChecked={handleCheck} checkboxVisible={props.checkboxVisible} />);

  return (
    <>
      <Button onClick={() => props.selectIngredients()}>{props.checkboxVisible ? 'Cancel' : 'Select recipe ingredients'}</Button>
      <div className="fridge-list">
        {parsedItems.length > 0 ? parsedItems : <h3>No results found</h3>}
      </div>
    </>
  )
}

export default FridgeList
