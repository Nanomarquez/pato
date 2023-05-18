import {
  type Action,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import productsReducer from "./slices/products";
import categoriesReducer from "./slices/categories";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    // matchs:productsReducer,
    categories: categoriesReducer,
  },
  middleware: (defaultMiddleware: any) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<unknown>
>;

export default store;
