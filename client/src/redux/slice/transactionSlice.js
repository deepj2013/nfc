import { createSlice } from "@reduxjs/toolkit";
import { getTransactionHistoryService, updateChequeStatusService } from "./userManagementSlice";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getTransactionHistoryService
      .addCase(getTransactionHistoryService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionHistoryService.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
      })
      .addCase(getTransactionHistoryService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateChequeStatusService
      .addCase(updateChequeStatusService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChequeStatusService.fulfilled, (state, action) => {
        state.loading = false;
        // Optional: Update transaction list if required
      })
      .addCase(updateChequeStatusService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
