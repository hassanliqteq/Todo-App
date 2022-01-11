import React, { useState } from "react";
import "./Todo.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  decEvent,
  selectEvents,
} from "../features/ItemReducer/Events";

const Events = () => {
  const [date, setDate] = useState();
  const [text, setText] = useState();
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    const object = {
      text: text,
      date: date,
    };
    dispatch(addEvent(object));
    setDate("");
    setText("");
  };

  return (
    <>
      <form onSubmit={handleClick} className="events">
        <h3>Pick a date for your Event Setter</h3>
        <input
          value={text}
          required
          placeholder="Whats the event about ?"
          onChange={(event) => setText(event.target.value)}
          type="text"
        />
        <input
          value={date}
          required
          onChange={(event) => setDate(event.target.value)}
          type="date"
        />
        <Button type="submit">Add Event</Button>
      </form>

      <div className="events-list">
        <h1>Listed Events</h1>
        {events.map((event, index) => (
          <div key={index} className="theevent bor">
            <h5>{event.text}</h5>
            <h5>{event.date}</h5>
            <Button
              sx={{ backgroundColor: "whitesmoke" }}
              onClick={() => dispatch(decEvent(index))}
            >
              Delete Event
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Events;
