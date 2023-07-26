import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";
import SoleReducer from "./reducer/Sole.reducer";
import MaterailReducer from "./reducer/Materail.reducer";
import BillReducer from "./reducer/Bill.reducer";
import AccountReducer from "./reducer/Account.reducer";
import BrandReducer from "./reducer/Brand.reducer";
import ProductReducer from "./reducer/Product.reducer";
import SizeReducer from "./reducer/Size.reducer";
import PromotionReducer from "./reducer/Promotion.reducer";
import CustomerReducer from "./reducer/Customer.reducer";
import AddressReducer from "./reducer/Address.reducer";
export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    sole: SoleReducer,
    material: MaterailReducer,
    account: AccountReducer,
    customer: CustomerReducer,
    bill: BillReducer,
    address: AddressReducer,
    brand: BrandReducer,
    product: ProductReducer,
    size: SizeReducer,
    promotion: PromotionReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
