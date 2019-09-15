import {combineReducers} from 'redux';
import user from './user';
import journey from './journey';
import notification from './notification';


export default combineReducers({
  user,
  journey,
  notification
});
