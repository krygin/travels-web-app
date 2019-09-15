import update from 'react-addons-update';

export const NOTIFICATIONS_PANEL = 'NOTIFICATIONS_PANEL';
export const DETAILS_PANEL = 'DETAILS_PANEL';

export const UPDATE_STATE = 'Notifications_UPDATE_STATE';

const updateState = state => ({
  type: UPDATE_STATE,
  state
});

export const actions = {
  update: updateState
};

const defaultState = {
  activePanel: NOTIFICATIONS_PANEL,
  currentJourneyId: null
};

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return update(state, {$merge: action.state});

    default:
      return state;
  }
};

export default reducers;