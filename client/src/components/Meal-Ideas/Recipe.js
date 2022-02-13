import React from "react";

function Recipe(props) {
  const { title, calories, image, recipeURL, ingredients } = props;

  const ingredientsArray = ingredients.map((ingredient) => ingredient.text);
  console.log("ingredients", ingredientsArray);

  return (
    <div className="Recipe">
      <h1> {title} </h1>
      <ol>
        <h6> Ingredients: </h6>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <h6> Calories: {Math.round(calories)} </h6>
      <img src={image} alt="recipe-image" />
      <a href={recipeURL}>Get Full Recipe</a>
    </div>
  );
}

export default Recipe;
