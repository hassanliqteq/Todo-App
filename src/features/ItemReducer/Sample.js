import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{ name: "Sample Name", todo: "Sample Todo" }],
};

const Sample = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    decTodo: (state, action) => {
      state.items.splice(action.payload, 1);
    },
  },
});

export default Sample.reducer;
export const selectItem = (state) => state.items.items;
export const { addTodo, decTodo } = Sample.actions;
