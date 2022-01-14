import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Components/Todo";
import { Select, MenuItem } from "@mui/material";
import Reminder from "./Components/Reminder";
import Events from "./Components/Events";
import { Routes, Route, Navigate, Link } from "react-router-dom";
function App() {
  const handleChange = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };
  // const [option, setOption] = useState(["text", "reminder", "event"]);
  const [selected, setSelected] = useState("reminder");

  return (
    <div className="app">
      <div className="header">
        <h1>Todo App</h1>
        <Select onChange={handleChange} value={selected}>
          <MenuItem value="text">Text Todos</MenuItem>
          <MenuItem value="reminder">Reminders/Alarm</MenuItem>
          <MenuItem value="event">Event Lister</MenuItem>
        </Select>
      </div>

      {/* {selected === "reminder" && <Reminder />}
        {selected === "event" && <Events />}
        {selected === "text" && <Todo />} */}
      <Routes>
        <Route
          path={`${selected === "reminder" ? "/" : "null"}`}
          element={<Reminder />}
        />
        <Route
          path={`${selected === "text" ? "/" : "null"}`}
          element={<Todo />}
        />
        <Route
          path={`${selected === "event" ? "/" : "null"}`}
          element={<Events />}
        />
      </Routes>
    </div>
  );
}

export default App;
