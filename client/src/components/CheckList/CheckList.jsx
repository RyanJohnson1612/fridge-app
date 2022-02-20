import { useEffect } from 'react';
import useCheckList from '../../hooks/useCheckList/useCheckList';
import CheckBox from '../Checkbox/Checkbox';
import './CheckList.scss';

function CheckList(props) {
  const { selected, setSelected, handleCheck } = useCheckList(props);

  useEffect(() => {
    if(props.filters[props.filter] && !Array.isArray(props.filters[props.filter])) {
      setSelected(props.filters[props.filter].replace('+', ' ').split('%2C'))
    }
  }, [props.filters]);

  useEffect(() => {
    props.onSelect(selected, props.filter);
  }, [selected]);

  const parsedCheckboxes = props.options.map(option =>
    <li className="check-list__item" key={option}>
      <CheckBox
        onChecked={handleCheck}
        option={option}
        initial={selected.includes(option)}
      />
    </li>
  );

  return (
    <ul className="check-list">
      {parsedCheckboxes}
    </ul>
  )
}

export default  CheckList
