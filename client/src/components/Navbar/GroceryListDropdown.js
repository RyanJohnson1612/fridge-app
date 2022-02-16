import React from 'react'

export default function GroceryListDropdown() {

  const [allGroceryLists, setAllGroceryLists] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/grocery_lists`)
      .then((results) => {
        console.log(results);
        setAllGroceryLists(results.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("all g lists:", allGroceryLists);


  return (
    <div>{groceryListsMapped}</div>
  )
}
