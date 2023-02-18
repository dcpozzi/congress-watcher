import {combineReducers} from 'redux';
import {congressMembersReducer} from './congressMembersReducer';
const reducers = combineReducers({
  congressMembersReducer,
});
export default reducers;
