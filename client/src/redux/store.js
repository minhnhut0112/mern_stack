import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterslice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
