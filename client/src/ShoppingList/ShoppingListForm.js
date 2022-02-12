import React, { useState } from "react";

function ShoppingListForm() {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    //Stop form refreshing page on submit
    e.preventDefault();
  };

  return (
    <form className="shopping-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        name="text"
        className="shopping-input"
      />
      <button className="todo-button"> Add todo</button>
    </form>
  );
}

export default ShoppingListForm;
