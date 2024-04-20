import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getSoldItem } from '../api/transactionAPI';

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async (params) => {
  return await getTransactions(params);
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (data) => {
  return await createTransaction(data);
});

export const editTransaction = createAsyncThunk('transactions/editTransaction', async ({ id, data }) => {
  return await updateTransaction(id, data);
});

export const removeTransaction = createAsyncThunk('transactions/removeTransaction', async (id) => {
  return await deleteTransaction(id);
});

export const fetchGetSoldItem = createAsyncThunk('transactions/fetchGetSoldItem', async (params) => {
  return await getSoldItem(params);
});

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    GetSoldItem: null,
    leastSoldItem: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((trans) => trans.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((trans) => trans.id !== action.payload.id);
      })
      .addCase(fetchGetSoldItem.fulfilled, (state, action) => {
        state.GetSoldItem = action.payload;
      });
  },
});

export default transactionSlice.reducer;
