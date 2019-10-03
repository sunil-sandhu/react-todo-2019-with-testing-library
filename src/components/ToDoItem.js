import React from "react";
import "./ToDoItem.css";

const ToDoItem = (props) => {
  const { item, deleteItem } = props;

  return (
    <div data-testid="todo-item" className="ToDoItem">
      <p data-testid="todo-text" className="ToDoItem-Text">
        {item.text}
      </p>
      <button data-testid="delete" className="ToDoItem-Delete" onClick={() => deleteItem(item)}>
        -
      </button>
    </div>
  );
};

export default ToDoItem;
