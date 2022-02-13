import React from "react";

function Recipe(props) {
  const { title, calories, image, recipeURL, ingredients } = props;

  const ingredientsArray = ingredients.map((ingredient) => ingredient.text);
  console.log("ingredients", ingredientsArray);

  return (
    <div>
      <h1> {title} </h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p> {calories} </p>
      <img src={image} alt="recipe-image" />
      <a href={recipeURL}>Get Full Recipe</a>
    </div>
  );
}

export default Recipe;
