import React, { useState } from "react";

function ShoppingListForm() {
  const [input, setInput] = useState("");

  return (

      <form className="shopping-form">
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
