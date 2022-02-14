import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

function Recipe(props) {
  const { title, image, recipeURL, ingredients } = props;
  const [open, setOpen] = useState(false);

  /*   When recipe has 5+ ingredients, list first 5, then insert a collapsable
  component that must be opened to see additional ingredients */
  const ingredientsFormatter = () => {
    let result = [];
    const ingredientsArray = ingredients.map((ingredient) => (
      <li> {ingredient.text} </li>
    ));
    if (ingredientsArray.length > 5) {
      result = ingredientsArray.slice(0, 5);
      result.push(
        <div>
          <Button variant="link" onClick={() => setOpen(!open)} size="sm">
            ...{ingredientsArray.length - 5} more ingredients
          </Button>
          <Collapse in={open}>
            {/* Display ingredients #6... to last ingredient */}
            <div>{ingredientsArray.slice(5, ingredientsArray.length)}</div>
          </Collapse>
        </div>
      );
    } else {
      result = ingredientsArray;
    }
    return result;
  };

  const ingredientsMapped = ingredientsFormatter();

  return (
    <div className="Recipe">
      <h4> {title} </h4>
      <ol className="round-numbers">
        <h6> Ingredients: </h6>
        {ingredientsMapped}
      </ol>
      <div className="recipe-card-footer">
        <img src={image} alt="recipe-image" />
        <a href={recipeURL}>Get Full Recipe</a>
      </div>
    </div>
  );
}

export default Recipe;
