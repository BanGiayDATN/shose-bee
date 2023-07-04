import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createMigrate } from "redux-persist";
import accountReducer from "./accountSlice";
import addressReducer from "./addressSlice";
import billReducer from "./billSlice";
import brandReducer from "./brandSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import employeesReducer from "./employeesSlice";
import colorReducer from "./colorSlice";
import customerReducer from "./customerSlice";
import materialReducer from "./materialSlice";
import notificationReducer from "./notificationSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import userReducers from "./usersSlice";
import sizeReducer from "./sizeSlice";
import soleReducer from "./soleSlice";
import userReducer from "./userSlice";
import voucherReducer from "./voucherSlice";

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

const MIGRATION_DEBUG = false;

const migrations = {
  1: (previousVersionState) => ({
    number: previousVersionState.number,
    lastUpdate: new Date(),
  }),
};
const persistConfig = {
  key: "root",
  version: 0,
  migrate: createMigrate(migrations, { debug: MIGRATION_DEBUG }),
  storage,
};
const rootReducer = combineReducers({
  account: accountReducer,
  address: addressReducer,
  brand: brandReducer,
  employees: employeesReducer,
  cart: cartReducer,
  category: categoryReducer,
  color: colorReducer,
  customer: customerReducer,
  material: materialReducer,
  notification: notificationReducer,
  sole: soleReducer,
  user: userReducer,
  voucher: voucherReducer,
  auth: authReducer,
  products: productReducer,
  users: userReducers,
  sizes: sizeReducer,
  bill: billReducer,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    account: accountReducer,
    address: addressReducer,
    brand: brandReducer,
    employees: employeesReducer,
    cart: cartReducer,
    category: categoryReducer,
    color: colorReducer,
    customer: customerReducer,
    material: materialReducer,
    notification: notificationReducer,
    sole: soleReducer,
    user: userReducer,
    voucher: voucherReducer,
    auth: authReducer,
    products: productReducer,
    users: userReducers,
    sizes: sizeReducer,
    bill: billReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER ],
  //     },
  //   }),
});

export let persistor = persistStore(store);

// https://www.bam.tech/en/article/redux-persist-how-it-works-and-how-to-change-the-structure-of-your-persisted-store
