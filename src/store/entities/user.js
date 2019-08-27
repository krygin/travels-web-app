import conf from 'shared/config';
import {CALL_API} from 'store/api';
import update from 'react-addons-update';
import {GET_PARTICIPANTS_SUCCESS} from "./journey";

export const VK_AUTH = 'VK_AUTH';
export const VK_AUTH_SUCCESS = 'VK_AUTH_SUCCESS';
export const VK_AUTH_FAILURE = 'VK_AUTH_FAILURE';


export const vkAuth = (accessToken) => ({
  [CALL_API]: {
    endpoint: conf.vkAuth,
    body: {
      params: accessToken
    },
    types: [VK_AUTH, VK_AUTH_SUCCESS, VK_AUTH_FAILURE]
  }
});

export const actions = {
  vkAuth
};

const defaultState = {
  isLoading: true,
  error: null,
  current: null,
  users: {}
};

export const user = (state = defaultState, action) => {
  switch (action.type) {
    case VK_AUTH: {
      return update(state, {
        isLoading: {$set: true}
      });
    }

    case VK_AUTH_SUCCESS:
      const user = action.payload.user;
      return update(state, {
        isLoading: {$set: false},
        current: {$set: user},
        users: {$merge: {[user.id]: user}}
      });

    case VK_AUTH_FAILURE:
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
