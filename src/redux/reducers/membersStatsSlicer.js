import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import congressProcessedDataApi from '../../api/congressProcessedDataApi';

const initialState = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  stats: [],
  error: null,
};

export const fetchMembersStatsRequest = createAsyncThunk(
  'member/fetchMembersStatisticsRequest',
  async () => {
    const response = await congressProcessedDataApi.get('/deputados');
    return response.data;
  },
);

const membersStatsSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMembersStatsRequest.pending, (state, action) => {
        state.loading = 'loading';
      })
      .addCase(fetchMembersStatsRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const stats = action.payload.reduce((acc, item) => {
          acc[item.idDeputado] = item;
          return acc;
        }, {});
        state.stats = stats;
      })
      .addCase(fetchMembersStatsRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllMembersStats = state => state.membersStatsReducer.stats;
export const getStatus = state => state.membersStatsReducer.status;
export const getError = state => state.membersStatsReducer.error;

export default membersStatsSlice.reducer;
