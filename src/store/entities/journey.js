import conf from 'shared/config';
import { CALL_API } from 'store/api';
import update from 'react-addons-update';

export const GET_LIST = 'GET_JOURNEY_LIST';
export const GET_LIST_SUCCESS = 'GET_JOURNEY_LIST_SUCCESS';
export const GET_LIST_ERROR = 'GET_JOURNEY_LIST_ERROR';

export const getJourneyList = () => ({
  [CALL_API]: {
    endpoint: conf.journeyList,
    types: [GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR]
  }
});

export const journeyActions = {
  getJourneyList
};

const defaultState = {
  isMapLoading: false,
  mapJourneyIds: [],
  journeys: {}
};

export const journey = (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return update(state, {
        isMapLoading: {$set: true}
      });

    case GET_LIST_SUCCESS:
      const journeys = {};
      const ids = action.payload.list.map(item => {
        journeys[item.id] = item;
        return item.id;
      });
      return update(state, {
        isMapLoading: {$set: false},
        journeys: {$merge: journeys},
        mapJourneyIds: {$set: ids}
      });

    case GET_LIST_ERROR:
      return update(state, {
        isMapLoading: {$set: false}
      });

    default: {
      return state;
    }

  }
};

export default journey;
