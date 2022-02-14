import React from "react";

function Recipe(props) {
  const { title, image, recipeURL, ingredients } = props;

  const ingredientsArray = ingredients.map((ingredient) => ingredient.text);
  console.log("ingredients", ingredientsArray);

  return (
    <div className="Recipe">
      <h4> {title} </h4>
      <ol>
        <h6> Ingredients: </h6>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <img src={image} alt="recipe-image" />
      <a href={recipeURL}>Get Full Recipe</a>
    </div>
  );
}

export default Recipe;
