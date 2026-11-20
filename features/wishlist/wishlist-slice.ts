import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistState = { productIds: string[] };
const initialState: WishlistState = { productIds: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistHydrated: (state, action: PayloadAction<string[]>) => {
      state.productIds = [...new Set(action.payload)];
    },
    wishlistToggled: (state, action: PayloadAction<string>) => {
      const index = state.productIds.indexOf(action.payload);
      if (index >= 0) state.productIds.splice(index, 1);
      else state.productIds.push(action.payload);
    },
    wishlistCleared: state => { state.productIds = []; },
  },
});

export const { wishlistHydrated, wishlistToggled, wishlistCleared } = wishlistSlice.actions;
export const selectWishlistIds = (state: RootState) => state.wishlist.productIds;
export const selectIsWishlisted = (state: RootState, productId: string) => state.wishlist.productIds.includes(productId);
export default wishlistSlice.reducer;
