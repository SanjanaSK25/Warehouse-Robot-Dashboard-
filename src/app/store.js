import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import botsReducer from "../features/bots/botsSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bots: botsReducer,
    tasks: tasksReducer, 
  },
});
