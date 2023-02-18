import {ActionTypes} from '../constants/actionTypes';

const initialState = {
  loading: false,
  members: [],
  error: '',
};

export const congressMembersReducer = (
  state = initialState,
  {type, payload},
) => {
  console.log(`congressMembersReducer(action: ${type})`);
  switch (type) {
    case ActionTypes.FETCH_MEMBERS_REQUESTED:
      return {
        loading: true,
      };
    case ActionTypes.FETCH_MEMBERS_SUCCEEDED:
      return {loading: false, members: payload, error: ''};
    case ActionTypes.FETCH_MEMBERS_FAILED:
      return {
        loading: false,
        members: [],
        error: payload,
      };
    default:
      return state;
  }
};
