import FridgeCard from '../FridgeCard/';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import useCheckList from '../../hooks/useCheckList/useCheckList';

function FridgeList(props) {
  const { selected, handleCheck } = useCheckList();
  const navigate = useNavigate();

  const redirectToRecipes = () => {
    const query = `?q=${selected.join(',')}`;
    navigate(`/recipes${query}`);
  };

  const parsedItems = props.items.map((item) => <FridgeCard item={item} key={item.id} onChecked={handleCheck} checkboxVisible={props.checkboxVisible} />);

  return (
    <>
      {props.checkboxVisible && <Button onClick={() => redirectToRecipes()}>Find Recipe Ideas</Button>}
      <Button onClick={() => props.selectIngredients()} variant={props.checkboxVisible ? 'danger' : 'primary'}>{props.checkboxVisible ? 'Cancel' : 'Select recipe ingredients'}</Button>
      <div className="fridge-list">
        {parsedItems.length > 0 ? parsedItems : <h3>No results found</h3>}
      </div>
    </>
  )
}

export default FridgeList
