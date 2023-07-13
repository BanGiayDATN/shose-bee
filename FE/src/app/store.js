import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";

export const store = configureStore({
    reducer: {
        category: CategoryReducer
    },
  });
  
  export const dispatch = store.dispatch;
  export const getState = store.getState;