import {combineReducers} from 'redux';
import user from './user';
import journey from './journey';


export default combineReducers({
  user,
  journey
});
