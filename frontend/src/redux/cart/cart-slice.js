import { createSlice } from '@reduxjs/toolkit';
import { cartApi } from './cart-api';

const initialState = {
  cart: [],
  loading: false,
  error: null,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.addToCart.matchFulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.deleteFromCart.matchFulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.updateCartById.matchFulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export default cartSlice.reducer;