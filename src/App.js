import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Components/Todo";
import { Select, MenuItem } from "@mui/material";
import Reminder from "./Components/Reminder";
import Events from "./Components/Events";

function App() {
  const handleChange = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };
  const [option, setOption] = useState(["text", "reminder", "event"]);
  const [selected, setSelected] = useState(option[0]);

  return (
    <div className="app">
      <div className="header">
        <h1>Todo App</h1>
        <Select onChange={handleChange} value={selected}>
          <MenuItem value={option[0]}>Text</MenuItem>
          <MenuItem value={option[1]}>Reminder</MenuItem>
          <MenuItem value={option[2]}>Events</MenuItem>
        </Select>
      </div>

      {selected === "reminder" && <Reminder />}
      {selected === "event" && <Events />}
      {selected === "text" && <Todo />}
    </div>
  );
}

export default App;
