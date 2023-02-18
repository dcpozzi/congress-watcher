import {ActionTypes} from '../constants/actionTypes';
import congressApi from '../../api/congressApi';

export const fetchMembersRequest = () => {
  return async (dispatch, getState) => {
    const response = await congressApi
      .get('/deputados?ordem=ASC&ordenarPor=nome')
      .catch(err => {
        console.log('Err: ', err);
      });
    dispatch(fetchMembersSuccess(response.data.dados));
  };
};

export const fetchMembersSuccess = members => {
  return {
    type: ActionTypes.FETCH_MEMBERS_SUCCEEDED,
    payload: members,
  };
};

export const fetchMembersFailure = error => {
  return {
    type: ActionTypes.FETCH_MEMBERS_FAILED,
    payload: error,
  };
};
