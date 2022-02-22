import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Recipe from "./Recipe";
import "./Recipe.scss";
import Spinner from "react-bootstrap/Spinner";
import drool from "../../assets/images/drool.png";
import { useNavigate } from "react-router-dom";
import useCheckList from '../../hooks/useCheckList/useCheckList';
import CheckBox from "../Checkbox/Checkbox";

function MealIdeas() {
  const navigate = useNavigate();
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

  //State and event handler to manage checkboxes used for dietRestrictions recipe filters
  const { selected, handleCheck } = useCheckList();

  //State to keep track of filters checked off
  const [filters, setFilters] = useState([]);

  //recipes state will be set to data that comes back from edamam API
  const [recipes, setRecipes] = useState([]);

  //State that is set to expiring food items in fridge
  const [expiring, setExpiring] = useState("");
  const [fridgeQuery, setfridgeQuery] = useState("");

  //Set to false when EDAMAM API returns no recipes
  const [recipesPresent, setRecipesPresent] = useState(true);

  useEffect(() => {
    getRecipes();
    if (location.search) {
      setfridgeQuery(location.search.replace("?q=", ""));
    } else {
      getFridgeItems();
    }
  }, [selected, fridgeQuery]);

  //Function that gets recipe data from Edamam API using axios call
  const getRecipes = () => {
    //Avoid axios call if fridgeQuery is blank
    if (fridgeQuery === "") {
      return;
    }
    axios
      .get(
        `https://api.edamam.com/search?q=${fridgeQuery}&app_id=${APP_ID}&app_key=${APP_KEY}${healthLabels()}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        setLoading(false);
        return res.data.hits;
      })
      .then((res) => {
        setRecipesPresent(res.length > 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Function to get all fridge items (axios), then update setfridgeQuery to expiring fridge items
  const getFridgeItems = () => {
    // GET /recipeItems will contain the 3 items closest to expiry in users fridge
    axios
      .get(`${process.env.REACT_APP_API_URL}/recipeItems`, {
        withCredentials: true,
      })
      .then((results) => {
        const closestToExpiry = results.data
          .map((itemObj) => itemObj.name)
          .join(", ");
        setfridgeQuery(closestToExpiry);
        setExpiring(fridgeQuery);
      })
      .then(() => getRecipes())
      .catch((error) => console.log(`Error: ${error.message}`));
  };

  //Generate queryString based off of dietary restrictions that were checked off
  const healthLabels = () => {
    let result = "";
    if (selected.length > 0) {
      selected.forEach((filter) => {
        result += `&health=${filter}`;
      });
    }
    return result.toLowerCase();
  };

  const handleNoRecipe = () => {
    navigate(`/fridge`);
  };

  return (
    <div className="Recipes-index">
      <div className="top-page">
        {expiring ? (
          <p>
            The three fridge items closest to expiring are:
            <span> {expiring}. </span> <br />
            Here are some recipes you could make to use up those ingredients!
          </p>
        ) : (
          <p>
            Recipes with ingredients:{" "}
            <span>{decodeURI(fridgeQuery).replace(/,/g, ", ")}</span>
          </p>
        )}

        {loading && (
          <div>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
        <div className="filters">
          <b>Dietary Filters</b>
          {/* {dietRestrictions.map((name, index) => {
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
          })} */}
          { dietRestrictions.map((name) => {
            return (
              <CheckBox
                key={name}
                onChecked={handleCheck}
                option={name}
              />
            )
          })
          }
        </div>
      </div>

      {recipesPresent ? (
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
      ) : (
        <div className="oh-no" onClick={handleNoRecipe}>
          <h5>
            Oh no. We couldn't find any recipes based on these ingredients...
            <br />
            try selecting different items from your fridge!
          </h5>
          <img className="drool" src={drool} alt="Drool" />
        </div>
      )}
    </div>
  );
}

export default MealIdeas;
