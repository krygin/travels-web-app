import {combineReducers} from 'redux';
import {authActions, user} from './auth';

export const actions = {
  auth: authActions
};

export default combineReducers({
  user
});
