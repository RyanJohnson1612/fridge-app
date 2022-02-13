import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";

function MealIdeas() {
  const APP_ID = "";
  const APP_KEY = "";

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
        <Recipe />
      ))}
    </div>
  );
}

export default MealIdeas;
