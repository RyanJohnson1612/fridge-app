import FridgeFilters from './FridgeFilters';
import './FridgeFilters.scss';

export default function FridgeFiltersIndex (props) {
  return <FridgeFilters onSearch={props.onSearch} onSelect={props.onSelect}/>
}
