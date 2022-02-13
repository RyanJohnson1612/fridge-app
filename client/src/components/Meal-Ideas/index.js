import React, { useEffect, useState } from "react";
import axios from "axios";

function MealIdeas() {
  const APP_ID = "";
  const APP_KEY = "";

  //const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

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
        console.log("recipes:", res.data.hits);
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
    </div>
  );
}

export default MealIdeas;
