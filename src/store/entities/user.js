import conf from 'shared/config';
import {CALL_API} from 'store/api';
import update from 'react-addons-update';
import {GET_PARTICIPANTS_SUCCESS} from "./journey";

export const GET_CURRENT = 'USER_GET_CURRENT';
export const GET_CURRENT_SUCCESS = 'USER_GET_CURRENT_SUCCESS';
export const GET_CURRENT_ERROR = 'USER_GET_CURRENT_ERROR';

export const getCurrent = () => ({
  [CALL_API]: {
    endpoint: conf.current,
    types: [GET_CURRENT, GET_CURRENT_SUCCESS, GET_CURRENT_ERROR]
  }
});

export const actions = {
  getCurrent
};

const defaultState = {
  isLoading: true,
  error: null,
  current: null,
  users: {}
};

export const user = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CURRENT:
      return update(state, {
        isLoading: {$set: true}
      });

    case GET_CURRENT_SUCCESS:
      const user = action.payload.user;
      return update(state, {
        isLoading: {$set: false},
        current: {$set: user},
        users: {$merge: {[user.id]: user}}
      });

    case GET_CURRENT_ERROR:
      return update(state, {
        isLoading: {$set: false},
        error: {$set: {body: action.payload}}
      });

    case GET_PARTICIPANTS_SUCCESS:
      const users = {};
      for (const index in action.payload) {
        const u = action.payload[index];
        users[u.id] = u;
      }
      return update(state, {
        users: {$merge: users}
      });

    default: {
      return state;
    }

  }
};

export default user;
