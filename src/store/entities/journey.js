import conf from 'shared/config';
import { CALL_API } from 'store/api';
import update from 'react-addons-update';

export const GET_LIST = 'GET_JOURNEY_LIST';
export const GET_LIST_SUCCESS = 'GET_JOURNEY_LIST_SUCCESS';
export const GET_LIST_ERROR = 'GET_JOURNEY_LIST_ERROR';

export const CREATE = 'GET_JOURNEY_CREATE';
export const CREATE_SUCCESS = 'GET_JOURNEY_CREATE_SUCCESS';
export const CREATE_ERROR = 'GET_JOURNEY_CREATE_ERROR';

export const getJourneyList = () => ({
  [CALL_API]: {
    endpoint: conf.journeyList,
    types: [GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR]
  }
});

export const createJourney = (positionId, beginDate, endDate, description) => ({
  [CALL_API]: {
    endpoint: conf.journeyCreate,
    method: 'POST',
    body: {
      route_item: positionId,
      begin_date: beginDate,
      endDate: endDate,
      description: description
    },
    types: [CREATE, CREATE_SUCCESS, CREATE_ERROR]
  }
});

export const journeyActions = {
  getJourneyList,
  createJourney
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
      const ids = action.payload.map(item => {
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

    case CREATE_SUCCESS:
      return update(state, {
        journeys: {$merge: { [action.payload.id]: action.payload }},
        mapJourneyIds: {$push: [action.payload.id]}
      });

    default: {
      return state;
    }

  }
};

export default journey;
