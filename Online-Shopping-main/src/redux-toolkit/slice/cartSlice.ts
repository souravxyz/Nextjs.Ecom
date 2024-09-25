"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux-toolkit/store/store";
import { CartState } from "@/typescript/interface/cart.interface";

const initialState: CartState = {
  cartData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<any>) {
      const product = action.payload;
      const existingProduct = state.cartData.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        state.cartData.push({ ...product, qty: 1 });
      }
    },
    updateQuantity(state, action: PayloadAction<any>) {
      const { id, qty } = action.payload;
      const existingProduct = state.cartData.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.qty = qty;
      }
    },

    removeFromCart(state, action: PayloadAction<any>) {
      const id = action.payload;
      state.cartData = state.cartData.filter((item) => item.id !== id);
    },
  },
});

export const { addProduct, updateQuantity, removeFromCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cartData;

export default cartSlice.reducer;
