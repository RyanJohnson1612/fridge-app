import React, { useState, useRef } from "react";
import { Button, Tooltip, Overlay } from "react-bootstrap";
import { GiCookingGlove } from "react-icons/gi";

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
      result.push(<div>...{ingredientsArray.length - 5} more ingredients</div>);
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
          <a href={recipeURL}> Full Recipe</a>{" "}
        </p>
        <ul className="dish-stats">
          <li>
            {" "}
            <GiCookingGlove size={30} opacity={0.5} />{" "}
          </li>
          <li>
            {" "}
            <Button
              variant="link"
              ref={target}
              onClick={() => setShow(!show)}
              size="sm"
            >
              {ingredients.length} ingredients
            </Button>{" "}
            <Overlay target={target.current} show={show} placement="right">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  {/* Display ingredients #6... to last ingredient */}
                  {ingredientsMapped}
                </Tooltip>
              )}
            </Overlay>
          </li>
        </ul>
      </div>
      <h1> {title} </h1>
    </div>
  );
}

export default Recipe;
