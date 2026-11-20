import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/products/products-slice";
import cartReducer from "@/features/cart/cart-slice";
import wishlistReducer from "@/features/wishlist/wishlist-slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
