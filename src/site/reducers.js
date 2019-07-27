import {combineReducers} from 'redux';

import jCreate from './components/journeys/JCreateView/redux';
import milestones from './components/journeys/MilestonesPanel/redux';

export default combineReducers({
  jCreate,
  milestones
});
