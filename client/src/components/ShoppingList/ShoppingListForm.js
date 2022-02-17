import React, { useState, useEffect, useRef } from "react";

function ShoppingListForm(props) {
  //props.input passed in from shopping list item when in form EDIT mode
  const [input, setInput] = useState(props.input ? props.input : "");

  //Input form ref attribute will call inputRefFocus to focus cursor on form
  const inputRefFocus = useRef(null);
  useEffect(() => {
    inputRefFocus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    //Stop from refreshing page on submit
    e.preventDefault();

    props.onSubmit({
      text: input,
    });

    //Clear input form after clicking submit
    setInput("");
  };
  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add an item"
        value={input}
        name="text"
        className="item-input"
        onChange={handleChange}
        ref={inputRefFocus}
      />
      <button className="item-button">
        {" "}
        {props.editMode ? "Edit Item" : "Add Item"}{" "}
      </button>
    </form>
  );
}

export default ShoppingListForm;
