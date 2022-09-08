import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    ffilter: filterReducer,
    cart: cartReducer,
  },
});
