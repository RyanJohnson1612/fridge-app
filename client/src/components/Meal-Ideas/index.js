import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";

function MealIdeas() {
  const APP_ID = "c91c9bd4";
  const APP_KEY = "988029de8e29a4a1503fea286388dfef";

  //state will be set to data that comes back from edamam API
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  //Function responsible for getting recipe data from API
  const getRecipes = () => {
    axios
      .get(
        `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        console.log(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form className="search-form">
        <input className="search-bar" type="text" />
        <button className="search-button" type="submit"></button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default MealIdeas;
