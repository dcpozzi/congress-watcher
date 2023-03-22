import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import congressApi from '../../api/congressApi';

const initialState = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  member: {},
  error: null,
};

export const fetchMemberRequest = createAsyncThunk(
  'member/fetchMember',
  async memberId => {
    const response = await congressApi
      .get(`/deputados/${memberId}`)
      .catch(err => {
        console.log('Err: ', err);
      });
    return response.data;
  },
);

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {reset: () => initialState},
  extraReducers(builder) {
    builder
      .addCase(fetchMemberRequest.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(fetchMemberRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.member = action.payload.dados;
      })
      .addCase(fetchMemberRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getMember = state => state.memberReducer.member;
export const getStatus = state => state.memberReducer.status;
export const getError = state => state.memberReducer.error;

export default memberSlice.reducer;
