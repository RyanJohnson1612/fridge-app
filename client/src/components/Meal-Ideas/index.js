import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";

function MealIdeas() {
  const APP_ID = "c91c9bd4";
  const APP_KEY = "988029de8e29a4a1503fea286388dfef";

  //state will be set to data that comes back from edamam API
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  /* If useEffect were to run everytime search state is updated,
  there would be be an API call for every keystroke.
  Therefore, create query state which only updates after search button is clicked */

  const [query, setQuery] = useState("");

  useEffect(() => {
    getRecipes();
  }, [query]);

  //Function responsible for getting recipe data from API
  const getRecipes = () => {
    axios
      .get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        console.log(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Function that will run everytime there is an onChange event in form
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  //Will be called in search form on submission only
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div>
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit"></button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default MealIdeas;
