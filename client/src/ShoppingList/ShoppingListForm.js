import React, { useState } from "react";

function ShoppingListForm(props) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    //Stop from refreshing page on submit
    e.preventDefault();

    /*     props.onSubmit({
      //Temporary way to generate unique id between 1-10,000
      id: Math.floor(Math.random() * 10000),
      text: input,
    }); */

    //Clears input form after clicking submit
    setInput("");
  };

  return (
    <form className="shopping-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        name="text"
        className="shopping-input"
        onChange={handleChange}
      />
      <button className="todo-button"> Add todo</button>
    </form>
  );
}

export default ShoppingListForm;
