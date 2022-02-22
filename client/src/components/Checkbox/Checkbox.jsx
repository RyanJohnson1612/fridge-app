import { useState, useEffect } from 'react';
import './Checkbox.scss';

function CheckBox(props) {
  const { option, initial, hideLabel, onChecked } = props;
  const [active, setActive] = useState(initial || false);

  useEffect(() => {
    setActive(initial);
  }, [initial])

  const handleChecked = (e) => {
    setActive(e.currentTarget.checked);
    onChecked(option);
  };

  return (
    <div className="checkbox">
      <input
        id={option}
        className="checkbox__input"
        type="checkbox"
        checked={active}
        onChange={(e) => handleChecked(e)}
      />
      <label className="checkbox__label" htmlFor={option}>{hideLabel ? '' : option}</label>
    </div>
  );
}

export default CheckBox;
