import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // * payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.bobaId !== action.payload);
    },
    increaseItemQty(state, action) {
      const item = state.cart.find((item) => item.bobaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQty(state, action) {
      // ? If you want to delete the item by decreasing then you can use the deleteItem payload. You can copy the delete item payload or use this neat trick, if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action).
      const item = state.cart.find((item) => item.bobaId === action.payload);
      if (item.quantity === 1) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQty = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQtyById = (id) => (state) =>
  state.cart.cart.find((item) => item.bobaId === id)?.quantity ?? 0;
