import React, { useState } from "react";

function ShoppingListForm(props) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    //Stop from refreshing page on submit
    e.preventDefault();

    props.onSubmit({
      //Temporary way to generate unique item id between 1-10,000 --> to be replaced
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    //Clear input form after clicking submit
    setInput("");
  };

  return (
    <form className="shopping-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add an item"
        value={input}
        name="text"
        className="shopping-input"
        onChange={handleChange}
      />
      <button className="item-button"> Add Item </button>
    </form>
  );
}

export default ShoppingListForm;
