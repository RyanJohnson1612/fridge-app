import { useState } from 'react';

function useCheckList() {
  const [selected, setSelected] = useState([]);

  const handleCheck = (option) => {
    if (selected.includes(option)) {
      const activeArr = [...selected];
      const index = activeArr.indexOf(option);
      activeArr.splice(index, 1);
      setSelected(activeArr);
    } else {
      setSelected(prev => ([...prev, option]));
    }
  }

  return {selected, setSelected, handleCheck}
}

export default useCheckList;
