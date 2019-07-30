import update from 'react-addons-update';

export const MAP_PANEL = "JMap_map";
export const DETAILS_PANEL = "JMap_details";
export const LIST_PANEL = "JMap_list";
export const JOURNEYS_VIEW = "JMap_journeys_view";
export const CREATE_VIEW = "JMap_create_view";

export const UPDATE_STATE = 'Journeys_UPDATE_STATE';

const updateState = state => ({
  type: UPDATE_STATE,
  state
});

export const actions = {
  update: updateState
};

const defaultState = {
  isListLoaded: false,
  activeView: JOURNEYS_VIEW,
  activePanel: MAP_PANEL,
  currentJourneyId: null,
  mapCenter: null,
  mapZoom: null
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