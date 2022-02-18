import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import "./Recipe.scss";
import Spinner from "react-bootstrap/Spinner";

function MealIdeas() {
  const dietRestrictions = [
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Gluten-Free",
    "Pork-Free",
  ];
  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

  //State to manage multiple checkboxes used for dietRestrictions recipe filters
  const [checkedState, setCheckedState] = useState(
    new Array(dietRestrictions.length).fill(false)
  );
  const [filters, setFilters] = useState([]);

  /////NOTE: UNCOMMENT if want to use searchbar functionality
  //recipes state will be set to data that comes back from edamam API
  const [recipes, setRecipes] = useState([]);
  //const [search, setSearch] = useState("");

  //frideQuery will be set to expiring food items in the fridge
  const [fridgeQuery, setfridgeQuery] = useState("");

  //State to determine if loading spinner should be displayed
  const [loading, setLoading] = useState(true);

  /* If useEffect were to run everytime search state is updated,
  there would be be an API call for every keystroke.
  Therefore, create query state which only updates after search button is clicked */
  /////NOTE: UNCOMMENT if want to use searchbar functionality, and place "query" in array
  //const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
    getFridgeItems();
  }, [filters, fridgeQuery]);

  //Updates filters state based on dietaryRestrictions checked off, then update setCheckedState
  const handleOnChange = (position) => {
    const allFilters = [];
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    updatedCheckedState.forEach((currentState, index) => {
      if (currentState === true) {
        allFilters.push(dietRestrictions[index]);
      }
    });
    setFilters([...allFilters]);
  };

  const healthLabels = () => {
    let result = "";
    if (filters.length > 0) {
      filters.forEach((filter) => {
        result += `&health=${filter}`;
      });
    }
    return result.toLowerCase();
  };

  //Function to get all fridge items (axios), then update setfridgeQuery to expiring fridge items
  const getFridgeItems = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fridge_items`)
      .then((res) => {
        console.log(res.data);
        setfridgeQuery(getExpiring(res.data));
        console.log("Fridge Query", fridgeQuery);
      })
      .catch((err) => console.log(err));
  };

  //Take in array of fridge items (from axios), return string of expiring foods
  const getExpiring = (fridgeItemsArray) => {
    //fridgeItemsArray is an array of objects. Filter for food objects that are expiring <= 7 days.
    const expiringArray = fridgeItemsArray.filter(
      (foodObject) => foodObject.expire_in <= 7
    );
    //Convert object of foods --> string of food names
    const expiringParsed = expiringArray
      .map((expiringObject) => expiringObject.name)
      .toString();
    return expiringParsed;
  };

  //Temporarily hardcode, in future pull from DB
  const expiringFoodItems = "soy sauce, onion";

  //Function that gets recipe data from Edamam API using axios call
  /////**NOTE: For searchbar functionality, replace expiringFoodItem with query
  const getRecipes = () => {
    axios
      .get(
        `https://api.edamam.com/search?q=${expiringFoodItems}&app_id=${APP_ID}&app_key=${APP_KEY}${healthLabels()}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Function that will run everytime there is an onChange event in form
  /*  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //Will be called in search form on submission only
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);

    //Clear input bar after each search
    setSearch("");
  }; */

  return (
    <div className="Recipes-index">
      <div className="top-page">
        <h4>Here are some recipe ideas for you based on your fridge items! </h4>
        {loading && (
          <div>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
        <div className="filters">
          <b>Dietary Filters</b>
          {dietRestrictions.map((name, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
              </div>
            );
          })}
        </div>
      </div>
      {/*       <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit"></button>
      </form> */}
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            recipeURL={recipe.recipe.url}
          />
        ))}
      </div>
    </div>
  );
}

export default MealIdeas;
