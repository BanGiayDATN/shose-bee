import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";
import SoleReducer from "./reducer/Sole.reducer";
import MaterailReducer from "./reducer/Materail.reducer";
import BillReducer from "./reducer/Bill.reducer";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    sole: SoleReducer,
    material: MaterailReducer,
    bill: BillReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
