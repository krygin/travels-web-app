import {combineReducers} from 'redux';

import map from './components/map/redux';
import jCreate from './components/journeys/JCreateView/redux';

export default combineReducers({
  map,
  jCreate,
});
