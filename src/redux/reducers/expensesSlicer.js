import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import congressApi from '../../api/congressApi';

const initialState = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  expenses: [],
  error: null,
};

export const fetchExpensesRequest = createAsyncThunk(
  'member/fetchExpenses',
  async data => {
    console.log('data: ' + JSON.stringify(data));
    const response = await congressApi
      .get(`/deputados/${data.memberId}/despesas?ano=${data.year}`)
      .catch(err => {
        console.log('Err: ', err);
      });
    return response.data;
  },
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExpensesRequest.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(fetchExpensesRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload.dados;
      })
      .addCase(fetchExpensesRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getExpenses = state => state.expensesReducer.expenses;
export const getStatus = state => state.expensesReducer.status;
export const getError = state => state.expensesReducer.error;

export default expensesSlice.reducer;
