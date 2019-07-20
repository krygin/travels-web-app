import {combineReducers} from 'redux';
// import { routerReducer as routing } from 'react-router-redux';
import site from 'site/reducers';
import entities from './entities';


export default combineReducers({
  // routing,
  site,
  entities
});
