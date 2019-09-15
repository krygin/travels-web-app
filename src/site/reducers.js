import {combineReducers} from 'redux';

import jCreate from './components/journeys/JCreateView/redux';
import milestones from './components/journeys/MilestonesPanel/redux';
import journeys from './components/journeys/redux';
import notifications from './components/notifications/redux';

export default combineReducers({
  jCreate,
  milestones,
  journeys,
  notifications
});
