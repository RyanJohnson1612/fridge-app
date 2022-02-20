import FridgeCard from './FridgeCard';
import './FridgeCard.scss';

function FridgeCardIndex(props) {
  return <FridgeCard item={props.item} onChecked={props.onChecked}/>
}

export default FridgeCardIndex;
