import FridgeList from './FridgeList';
import './FridgeList.scss';

export default function FridgeListIndex(props) {
  return <FridgeList items={props.items} loading={props.loading} />
}

