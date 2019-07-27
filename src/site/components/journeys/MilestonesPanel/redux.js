import {uuid4} from 'shared/utils/helpers';
import update from 'react-addons-update';
import {CALL_API} from "store/api";
import conf from "shared/config";

export const CREATE_MILESTONE = 'MilestonesPanel_CREATE_MILESTONE';
export const CREATE_MILESTONE_SUCCESS = 'MilestonesPanel_CREATE_MILESTONE_SUCCESS';
export const CREATE_MILESTONE_ERROR = 'MilestonesPanel_CREATE_MILESTONE_ERROR';

export const createMilestone = files => ({
  [CALL_API]: {
    endpoint: conf.attachmentUpload,
    method: 'POST',
    body: files,
    types: [CREATE_MILESTONE, CREATE_MILESTONE_SUCCESS, CREATE_MILESTONE_ERROR],
    additionalData: {id: uuid4()}
  }
});

export const UPDATE_MILESTONE = 'MilestonesPanel_UPDATE_MILESTONE';

export const updateMilestone = (id, description) => ({
  type: UPDATE_MILESTONE,
  id,
  description
});

export const CLEAN = 'MilestonesPanel_CLEAN';

export const clean = () => ({
  type: CLEAN
});

export const actions = {
  createMilestone,
  updateMilestone,
  clean
};

const defaultState = {
  ids: [],
  objects: {}
};

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_MILESTONE:
      return update(state, {
        ids: {$push: [action.additionalData.id]},
        objects: {$merge: {
          [action.additionalData.id]: {
            attachment: null,
            description: null,
            isLoading: true
          }
        }}
      });

    case CREATE_MILESTONE_SUCCESS:
      return update(state, {
        objects: {$merge: {
          [action.additionalData.id]: {
            attachment: action.payload[0],
            description: null,
            isLoading: false
          }
        }}
      });

    case CREATE_MILESTONE_ERROR:
      return update(state, {
        ids: {$set: state.ids.filter(id => id !== action.additionalData.id)}
      });

    case UPDATE_MILESTONE:
      return update(state, {
        objects: {
          [action.id]: {$merge: {
            description: action.description
          }}
        }
      });

    case CLEAN:
      return update(state, {
        ids: {$set: []},
        objects: {$set: {}}
      });

    default:
      return state;
  }
};

export default reducers;