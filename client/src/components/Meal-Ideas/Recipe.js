import React from "react";

function Recipe(props) {
  const { title, calories, image } = props;

  return (
    <div>
      <h1> {title} </h1>
      <p> {calories} </p>
      <img src={image} alt="recipe-image" />
    </div>
  );
}

export default Recipe;
