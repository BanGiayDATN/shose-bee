import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";
import SoleReducer from "./reducer/Sole.reducer";
import MaterailReducer from "./reducer/Materail.reducer";
<<<<<<< HEAD
import AccountReducer from "./reducer/Account.reducer";
=======
import BrandReducer from "./reducer/Brand.reducer";
import ProductReducer from "./reducer/Product.reducer";
import SizeReducer from "./reducer/Size.reducer";
>>>>>>> develop

import VoucherReducer from "./reducer/Voucher.reducer";
export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    sole: SoleReducer,
    material: MaterailReducer,
<<<<<<< HEAD
    account: AccountReducer,
=======
    brand: BrandReducer,
    product: ProductReducer,
    size: SizeReducer,
    voucher: VoucherReducer,
>>>>>>> develop
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
