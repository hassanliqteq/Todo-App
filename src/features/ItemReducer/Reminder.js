import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alarms: [{ text: "Sample Alarm", time: "Sample Time" }],
};

const Reminder = createSlice({
  name: "Reminders",
  initialState,
  reducers: {
    addAlarm: (state, action) => {
      state.alarms.push(action.payload);
    },
    decAlarm: (state, action) => {
      state.alarms.splice(action.payload, 1);
    },
  },
});

export const { addAlarm, decAlarm } = Reminder.actions;
export default Reminder.reducer;
export const selectAlarms = (state) => state.alarms.alarms;
