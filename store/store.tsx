import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/products/productsSlice";
import cartReducer from "@/features/Cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
