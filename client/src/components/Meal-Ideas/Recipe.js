import React, { useState, useRef } from "react";
import { Button, Tooltip, Overlay } from "react-bootstrap";

function Recipe(props) {
  const { title, image, recipeURL, ingredients } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null);

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
          <Button
            variant="link"
            ref={target}
            onClick={() => setShow(!show)}
            size="sm"
          >
            ...{ingredientsArray.length - 5} more ingredients
          </Button>

          <Overlay target={target.current} show={show} placement="right">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                {/* Display ingredients #6... to last ingredient */}
                <div>{ingredientsArray.slice(5, ingredientsArray.length)}</div>
              </Tooltip>
            )}
          </Overlay>
        </div>
      );
    } else {
      result = ingredientsArray;
    }
    return result;
  };

  const ingredientsMapped = ingredientsFormatter();

  return (
    <div className="recipe-card">
      <figure>
        <img src={image} alt="recipe-image" />
      </figure>

      <div className="card-meta">
        <p className="dish-type">
          {" "}
          <a href={recipeURL}>Get Full Recipe</a>
        </p>
        <ul className="dish-stats">
          <li> # ingredients</li>
        </ul>
        <h1> {title} </h1>
      </div>
    </div>
  );
}

export default Recipe;
