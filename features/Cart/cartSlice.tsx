import { RootState } from "@/store/store";
import { CartItem, PromoCode } from "@/types/cart";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter<CartItem, string>({
  // Changed: cart entities are now keyed by cart-line id so variants can coexist.
  selectId: (item: CartItem) => item.id,
});
const initialState = cartAdapter.getInitialState({
  appliedPromo: null as PromoCode | null,
  discountedPrice: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.entities[id];

      if (existingItem) {
        cartAdapter.updateOne(state, {
          id,
          changes: { quantity: existingItem.quantity + quantity },
        });
      } else {
        cartAdapter.addOne(state, action.payload);
      }
    },

    increaseItemCount: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.entities[id];

      if (!existingItem) return;

      if (existingItem.quantity >= existingItem.maxQuantity) return;

      cartAdapter.updateOne(state, {
        id,
        changes: { quantity: existingItem.quantity + 1 },
      });
    },

    updateItemCount: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.entities[id];

      if (!existingItem) return;
      if (quantity < 1 || quantity > existingItem.maxQuantity) return;

      cartAdapter.updateOne(state, { id, changes: { quantity } });
    },

    applyPromo: (state, action: PayloadAction<PromoCode>) => {
      state.appliedPromo = action.payload;
    },

    removePromo: (state) => {
      state.appliedPromo = null;
      state.discountedPrice = 0;
    },

    decreaseItemCount: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.entities[id];
      if (existingItem.quantity > 1) {
        cartAdapter.updateOne(state, {
          id,
          changes: { quantity: existingItem.quantity - 1 },
        });
      } else {
        cartAdapter.removeOne(state, id);
      }
    },

    productAdded: cartAdapter.addOne,
    cartReceived: cartAdapter.setAll,
    productUpdated: cartAdapter.updateOne,
    productRemoved: cartAdapter.removeOne,
  },
});

// ✅ Export selectors (fixed naming for consistency)
export const {
  selectAll: selectAllCart,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
} = cartAdapter.getSelectors((state: RootState) => state.cart);

export const isInCart = createSelector(
  [selectAllCart, (state: RootState, id: string) => id],
  (cartItems, id) => {
    if (!id) return false;

    // Changed: listing-level checks stay product-based, not line-id based.
    return cartItems.some((item) => item.productId === id);
  },
);

export const selectAppliedPromo = (state: RootState) => state.cart.appliedPromo;

export const selectCartCount = createSelector(
  [selectAllCart],
  (cart) => cart.length,
);

export const selectCartSubtotal = createSelector([selectAllCart], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

export const selectDiscountAmount = createSelector(
  [selectCartSubtotal, (state: RootState) => state.cart.appliedPromo],
  (subtotal, promo) => {
    if (!promo) return 0;

    if (promo.type === "percentage") {
      return subtotal * (promo.value / 100);
    }

    return Math.min(promo.value, subtotal);
  },
);

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectDiscountAmount],
  (subtotal, discount) => subtotal - discount,
);

// ✅ Export actions
export const {
  addItem,
  productAdded,
  cartReceived,
  increaseItemCount,
  decreaseItemCount,
  productUpdated,
  applyPromo,
  removePromo,
  productRemoved,
  updateItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
