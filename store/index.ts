import userReducer from "@/store/userByIdSlice";
import usersReducer from "@/store/usersSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  }
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
