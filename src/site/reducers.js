import {combineReducers} from 'redux';

import map from './components/map/redux';
import jCreate from './components/journeys/JCreateView/redux';
import milestones from './components/journeys/MilestonesPanel/redux';

export default combineReducers({
  map,
  jCreate,
  milestones
});
