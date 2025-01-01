import { createSlice } from '@reduxjs/toolkit';
import { transactionApi } from './transaction-api';

const initialState = {
  transactions: [],
  transaction: {},
  loading: false,
  error: null,
};


const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(transactionApi.endpoints.getTransactions.matchFulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addMatcher(transactionApi.endpoints.getTransactionById.matchFulfilled, (state, action) => {
      state.transaction = action.payload;
    });
    builder.addMatcher(transactionApi.endpoints.addToTransaction.matchFulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addMatcher(transactionApi.endpoints.deleteFromTransaction.matchFulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addMatcher(transactionApi.endpoints.updateTransactionById.matchFulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export default transactionSlice.reducer;