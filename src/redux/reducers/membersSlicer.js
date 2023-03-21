import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import congressApi from '../../api/congressApi';

const initialState = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  members: [],
  error: null,
};

export const fetchMembersRequest = createAsyncThunk(
  'members/fetchMembers',
  async () => {
    const response = await congressApi.get(
      '/deputados?ordem=ASC&ordenarPor=nome',
    );
    return response.data;
  },
);

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMembersRequest.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(fetchMembersRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = action.payload.dados;
      })
      .addCase(fetchMembersRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllMembers = state => state.membersReducer.members;
export const getStatus = state => state.membersReducer.status;
export const getError = state => state.membersReducer.error;

export default membersSlice.reducer;
