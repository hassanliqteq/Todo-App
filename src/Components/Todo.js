import React, { useState } from "react";
import { addTodo, decTodo } from "../features/ItemReducer/Sample";
import "./Todo.css";
import { selectItem } from "../features/ItemReducer/Sample";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Todo = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItem);
  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (name === "" || todo === "") {
      window.alert("Empty Values!");
      return;
    }
    dispatch(addTodo({ name: name, todo: todo }));
    setName("");
    setTodo("");
  };
  const handleDel = (Data) => {
    console.log("Here: ", Data);
    dispatch(decTodo({ Data }));
  };

  return (
    <div className="todo">
      <form onSubmit={handleClick} className="todo-form">
        <h3>Text Todos</h3>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          type="text"
        />
        <input
          required
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Todo"
          type="text"
        />
        <Button type="submit" sx={{ backgroundColor: "whitesmoke" }}>
          Add Todo
        </Button>
      </form>
      <div className="container mt-3">
        <div className="row">
          <div className="col-3 table-text">Name</div>
          <div className="col-7 table-text">Todo</div>
          <div className="col-2 table-text">Action</div>
          {items.map((item, index) => (
            <div key={index} className="container">
              <div className="row p-2 bor todos-text">
                <div className="col-3">{item.name}</div>
                <div className="col-7">{item.todo}</div>
                <Button
                  sx={{ backgroundColor: "whitesmoke" }}
                  className="col-2"
                  onClick={() => handleDel(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
