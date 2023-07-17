import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";
import SoleReducer from "./reducer/Sole.reducer";
import MaterailReducer from "./reducer/Materail.reducer";
import VoucherReducer from "./reducer/Voucher.reducer";
export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    sole: SoleReducer,
    material: MaterailReducer,
    voucher: VoucherReducer
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
