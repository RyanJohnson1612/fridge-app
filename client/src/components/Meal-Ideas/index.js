import React, { useEffect, useState } from "react";

function MealIdeas() {
  const APP_ID = "c91c9bd4";
  const APP_KEY = "988029de8e29a4a1503fea286388dfef";

  const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Effect has been run");
  }, []);

  return (
    <div>
      <form className="search-form">
        <input className="search-bar" type="text" />
        <button className="search-button" type="submit">
          {counter}
        </button>
      </form>
    </div>
  );
}

export default MealIdeas;
