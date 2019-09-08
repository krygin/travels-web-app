import conf from 'shared/config';
import { CALL_API } from 'store/api';
import update from 'react-addons-update';

export const GET_LIST = 'GET_JOURNEY_LIST';
export const GET_LIST_SUCCESS = 'GET_JOURNEY_LIST_SUCCESS';
export const GET_LIST_ERROR = 'GET_JOURNEY_LIST_ERROR';

export const getJourneyList = (params = null) => ({
  [CALL_API]: {
    endpoint: conf.journeyList,
    body: {
      params: {
        userId: (params || {}).userId
      }
    },
    types: [GET_LIST, GET_LIST_SUCCESS, GET_LIST_ERROR]
  }
});

export const CREATE = 'GET_JOURNEY_CREATE';
export const CREATE_SUCCESS = 'GET_JOURNEY_CREATE_SUCCESS';
export const CREATE_ERROR = 'GET_JOURNEY_CREATE_ERROR';

export const createJourney = (positionId, beginDate, endDate, description) => ({
  [CALL_API]: {
    endpoint: conf.journeyCreate,
    method: 'POST',
    body: {
      route_item: positionId,
      begin_date: beginDate,
      end_date: endDate,
      description: description
    },
    types: [CREATE, CREATE_SUCCESS, CREATE_ERROR]
  }
});

export const UPDATE_MILESTONES = 'UPDATE_MILESTONES';
export const UPDATE_MILESTONES_SUCCESS = 'UPDATE_MILESTONES_SUCCESS';
export const UPDATE_MILESTONES_ERROR = 'UPDATE_MILESTONES_ERROR';

export const updateMilestones = (journeyId, milestones) => ({
  [CALL_API]: {
    endpoint: conf.journeyUpdateMilestones,
    method: 'POST',
    body: {
      journey: journeyId,
      milestones: milestones
    },
    types: [UPDATE_MILESTONES, UPDATE_MILESTONES_SUCCESS, UPDATE_MILESTONES_ERROR]
  }
});

export const JOIN2JOURNEY = 'JOIN2JOURNEY';
export const JOIN2JOURNEY_SUCCESS = 'JOIN2JOURNEY_SUCCESS';
export const JOIN2JOURNEY_ERROR = 'JOIN2JOURNEY_ERROR';

export const join2journey = journeyId => ({
  [CALL_API]: {
    endpoint: conf.journeyJoin,
    method: 'POST',
    body: {
      journey: journeyId
    },
    types: [JOIN2JOURNEY, JOIN2JOURNEY_SUCCESS, JOIN2JOURNEY_ERROR]
  }
});

export const GET_PARTICIPANTS = 'GET_PARTICIPANTS';
export const GET_PARTICIPANTS_SUCCESS = 'GET_PARTICIPANTS_SUCCESS';
export const GET_PARTICIPANTS_ERROR = 'GET_PARTICIPANTS_ERROR';

export const getParticipants = journeyId => ({
  [CALL_API]: {
    endpoint: conf.journeyGetParticipants,
    body: {
      params: {
        journey: journeyId
      }
    },
    additionalData: {journeyId},
    types: [GET_PARTICIPANTS, GET_PARTICIPANTS_SUCCESS, GET_PARTICIPANTS_ERROR]
  }
});

export const journeyActions = {
  getJourneyList,
  createJourney,
  updateMilestones,
  join2journey,
  getParticipants
};

const defaultState = {
  isListLoading: false,
  filteredJourneyIds: [],
  journeys: {},
  participants: {}
};

export const journey = (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return update(state, {
        isListLoading: {$set: true}
      });

    case GET_LIST_SUCCESS:
      const journeys = {};
      const ids = action.payload.map(item => {
        journeys[item.id] = item;
        return item.id;
      });
      return update(state, {
        isListLoading: {$set: false},
        journeys: {$merge: journeys},
        filteredJourneyIds: {$set: ids}
      });

    case GET_LIST_ERROR:
      return update(state, {
        isListLoading: {$set: false}
      });

    case CREATE_SUCCESS:
      return update(state, {
        journeys: {$merge: { [action.payload.id]: action.payload }},
        filteredJourneyIds: {$push: [action.payload.id]}
      });

    case UPDATE_MILESTONES_SUCCESS:
      return update(state, {
        journeys: {$merge: { [action.payload.id]: action.payload }}
      });

    case GET_PARTICIPANTS_SUCCESS:
      const userIds = action.payload.map(item => item.id);
      return update(state, {
        participants: {$merge: {
          [action.additionalData.journeyId]: userIds
        }}
      });

    default: {
      return state;
    }

  }
};

export default journey;
