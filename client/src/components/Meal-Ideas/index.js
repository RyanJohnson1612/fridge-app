import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Recipe from "./Recipe";
import "./Recipe.scss";
import Spinner from "react-bootstrap/Spinner";

function MealIdeas() {
  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

  const location = useLocation();

  //State to determine if loading spinner should be displayed
  const [loading, setLoading] = useState(true);

  //These will serve as recipe filters
  const dietRestrictions = [
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Gluten-Free",
    "Pork-Free",
  ];

  //State to manage multiple checkboxes used for dietRestrictions recipe filters
  const [checkedState, setCheckedState] = useState(
    new Array(dietRestrictions.length).fill(false)
  );

  //State to keep track of filters checked off
  const [filters, setFilters] = useState([]);

  //recipes state will be set to data that comes back from edamam API
  const [recipes, setRecipes] = useState([]);


  //State that is set to expiring food items in fridge
  const [expiring, setExpiring] = useState("");
  const [fridgeQuery, setfridgeQuery] = useState("");

  useEffect(() => {
    getRecipes();
    if (location.search) {
      setfridgeQuery(location.search.replace('?q=', ''));
    } else {
      getFridgeItems();
    }
  }, [filters, fridgeQuery]);

  //Function that gets recipe data from Edamam API using axios call
  const getRecipes = () => {

    axios
      .get(
        `https://api.edamam.com/search?q=${fridgeQuery}&app_id=${APP_ID}&app_key=${APP_KEY}${healthLabels()}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Function to get all fridge items (axios), then update setfridgeQuery to expiring fridge items
  const getFridgeItems = () => {

    // GET /recipeItems will contain the 3 items closest to expiry in users fridge
    axios.get(`${process.env.REACT_APP_API_URL}/recipeItems`, { withCredentials: true })
    .then((results) => {
      const closestToExpiry = results.data.map( itemObj => itemObj.name).join(", ")
      setfridgeQuery(closestToExpiry)
      setExpiring(fridgeQuery)
    })
    .catch(error => console.log(`Error: ${error.message}`));

  };

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

  //Generate queryString based off of dietary restrictions that were checked off
  const healthLabels = () => {
    let result = "";
    if (filters.length > 0) {
      filters.forEach((filter) => {
        result += `&health=${filter}`;
      });
    }
    return result.toLowerCase();
  };

  return (
    <div className="Recipes-index">
      <div className="top-page">
        {expiring ?
          <p>
            The three fridge items closest to expiring are:
            <span> {expiring}. </span> <br />
            Here are some recipes you could make to use up those ingredients!
          </p>
        :
          <p>Recipes with ingredients: <span>{decodeURI(fridgeQuery).replace(/,/g, ', ')}</span></p>
        }


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
