import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import congressApi from '../../api/congressApi';

const initialState = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  parties: [],
  error: null,
};

export const fetchPartiesRequest = createAsyncThunk(
  'parties/fetchParties',
  async () => {
    const response = await congressApi.get(
      '/partidos?ordem=ASC&ordenarPor=sigla',
    );
    return response.data;
  },
);

const partiesSlice = createSlice({
  name: 'parties',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPartiesRequest.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(fetchPartiesRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parties = action.payload.dados;
      })
      .addCase(fetchPartiesRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllParties = state => state.partiesReducer.parties;
export const getStatus = state => state.partiesReducer.status;
export const getError = state => state.partiesReducer.error;

export default partiesSlice.reducer;
