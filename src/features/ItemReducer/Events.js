import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [{ text: "Sample Event", date: "2022-01-10" }],
};

const Events = createSlice({
  name: "theevents",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    decEvent: (state, action) => {
      state.events.splice(action.payload, 1);
    },
  },
});

export const { addEvent, decEvent } = Events.actions;
export default Events.reducer;
export const selectEvents = (state) => state.events.events;
export const selectItem = (state) => state.items.items;
