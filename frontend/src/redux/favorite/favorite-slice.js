import { createSlice } from '@reduxjs/toolkit';
import { favApi } from './favorite-api';

const initialState = {
  favorite: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(favApi.endpoints.getFavorite.matchFulfilled, (state, action) => {
      state.favorite = action.payload;
    });
    builder.addMatcher(favApi.endpoints.addFavorite.matchFulfilled, (state, action) => {
      state.favorite = action.payload;
    });
    builder.addMatcher(favApi.endpoints.deleteFavorite.matchFulfilled, (state, action) => {
      state.favorite = action.payload;
    });
  },
});


export default authSlice.reducer;
