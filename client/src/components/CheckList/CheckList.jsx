import { useState, useEffect } from 'react';
import CheckBox from '../Checkbox/Checkbox';
import './CheckList.scss';

function CheckList(props) {
  const [active, setActive] = useState([]);

  useEffect(() => {
    if(props.filters[props.filter] && !Array.isArray(props.filters[props.filter])) {
      setActive(props.filters[props.filter].replace('+', ' ').split('%2C'))
    }
  }, [props.filters]);

  useEffect(() => {
    props.onSelect(active, props.filter);
  }, [active]);

  const handleCheck = (option) => {
    if (active.includes(option)) {
      const activeArr = [...active];
      const index = activeArr.indexOf(option);
      activeArr.splice(index, 1);
      setActive(activeArr);
    } else {
      setActive(prev => ([...prev, option]));
    }
  }

  const parsedCheckboxes = props.options.map(option =>
    <li className="check-list__item" key={option}>
      <CheckBox
        onChecked={handleCheck}
        option={option}
        initial={active.includes(option)}
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
