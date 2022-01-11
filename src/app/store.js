import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import itemReducer from "../features/ItemReducer/Sample";
import eventReducer from "../features/ItemReducer/Events";
import reminderReducer from "../features/ItemReducer/Reminder";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
const persistConfig = {
  key: "root",
  version: "1",
  storage,
};
const persistedReducer = persistReducer(persistConfig, eventReducer);
const persistedReducer1 = persistReducer(persistConfig, itemReducer);
const persistedReducer2 = persistReducer(persistConfig, counterReducer);
const persistedReducer3 = persistReducer(persistConfig, reminderReducer);

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     items: itemReducer,
//     events: persistReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    events: persistedReducer,
    items: persistedReducer1,
    count: persistedReducer2,
    alarms: persistedReducer3,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
