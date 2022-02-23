import FridgeCard from '../FridgeCard/';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import useCheckList from '../../hooks/useCheckList/useCheckList';
import useFridgeSearch from '../../hooks/useFridgeSearch/useFridgeSearch';
import drool from "../../assets/images/drool.png";

function FridgeList(props) {
  const { checkboxVisible, selectIngredients } = useFridgeSearch();
  const { selected, handleCheck } = useCheckList();
  const navigate = useNavigate();

  const redirectToRecipes = () => {
    const query = `?q=${selected.join(',')}`;
    navigate(`/recipes${query}`);
  };

  const parsedItems = props.items.map((item) => <FridgeCard item={item} key={item.id} onChecked={handleCheck} checkboxVisible={checkboxVisible} />);

  return (
    <>
      <div className="fridge-list__buttons">
        {checkboxVisible ?
          <>
            <Button onClick={() => redirectToRecipes()} className="fridge-list__buttons--primary">Find recipe ideas</Button>
            <Button onClick={() => selectIngredients()} className="fridge-list__buttons--cancel">Cancel</Button>
          </>
          :
          <Button onClick={() => selectIngredients()} className="fridge-list__buttons--primary">Select recipe ingredients</Button>
        }
      </div>
      <div className="fridge-list">
        {
          parsedItems.length > 0 ? parsedItems :
          <div className="oh-no">
          <h5>
            Oh no. We couldn't find any items in your fridge based on these filters...
            <br />
            try changing your search criteria!
          </h5>
          <img className="drool" src={drool} alt="Drool" />
        </div>
        }
      </div>
    </>
  )
}

export default FridgeList
