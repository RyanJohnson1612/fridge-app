import { useState, useEffect } from 'react';
import './Checkbox.scss';

function CheckBox(props) {
  const { option, initial, onChecked } = props;
  const [active, setActive] = useState(initial || false);

  useEffect(() => {
    setActive(initial);
  }, [initial])

  const handleChecked = () => {
    setActive(prev => (!prev));
    onChecked(option);
  };

  return (
    <>
      <input
        id={option}
        className="checkbox__input"
        type="checkbox"
        checked={active}
        onChange={() => handleChecked()}
      />
      <label className="checkbox__label" htmlFor={option}>{option}</label>
    </>
  );
}

export default CheckBox;
