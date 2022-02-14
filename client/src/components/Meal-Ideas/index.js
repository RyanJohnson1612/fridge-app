import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import "./Recipe.scss";
import Spinner from "react-bootstrap/Spinner";

function MealIdeas() {
  const dietRestrictions = ["vegeterian", "vegan", "banana"];
  const APP_ID = "c91c9bd4";
  const APP_KEY = "988029de8e29a4a1503fea286388dfef";

  //State to manage multiple checkboxes used for recipe filters
  const [checkedState, setCheckedState] = useState(
    new Array(dietRestrictions.length).fill(false)
  );

  const [filters, setFilters] = useState("");

  console.log("checkedState", checkedState);

  /////NOTE: UNCOMMENT if want to use searchbar functionality
  //state will be set to data that comes back from edamam API
  const [recipes, setRecipes] = useState([]);
  //const [search, setSearch] = useState("");

  //Use to determine if loading spinner should be displayed
  const [loading, setLoading] = useState(true);

  /* If useEffect were to run everytime search state is updated,
  there would be be an API call for every keystroke.
  Therefore, create query state which only updates after search button is clicked */

  /////NOTE: UNCOMMENT if want to use searchbar functionality, and place "query" in array
  //const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const allFilters = updatedCheckedState.reduce(
      (combined, currentState, index) => {
        if (currentState === true) {
          return combined + " " + dietRestrictions[index];
        }
        return combined;
      },
      " "
    );

    setFilters(allFilters);
    console.log("these are the filters you selected:", filters);
  };

  //Temporarily hardcode, in future pull from DB
  const expiringFoodItems = "milk, strawberry";

  //Function that gets recipe data from Edamam API using axios call
  /////**NOTE: For searchbar functionality, replace expiringFoodItem with query
  const getRecipes = () => {
    axios
      .get(
        `https://api.edamam.com/search?q=${expiringFoodItems}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        console.log(res.data.hits);
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
      <h3>Here are some recipe ideas for you based on your fridge items! </h3>
      {loading && (
        <div>
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      {/*       <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit"></button>
      </form> */}
      <div className="filters">
        {dietRestrictions.map((name, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={name}
                value={name}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
            </li>
          );
        })}
      </div>
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
