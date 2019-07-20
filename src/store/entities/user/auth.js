import conf from 'shared/config';
import {CALL_API} from 'store/api';
import update from 'react-addons-update';

export const GET_CURRENT = 'USER_GET_CURRENT';
export const GET_CURRENT_SUCCESS = 'USER_GET_CURRENT_SUCCESS';
export const GET_CURRENT_ERROR = 'USER_GET_CURRENT_ERROR';

export const getCurrent = () => ({
  [CALL_API]: {
    endpoint: conf.current,
    types: [GET_CURRENT, GET_CURRENT_SUCCESS, GET_CURRENT_ERROR]
  }
});

export const authActions = {
  getCurrent
};

const defaultState = {
  isLoading: false,
  current: null
};

export const user = (state = defaultState, action) => {
  switch (action.type) {
    case GET_CURRENT:
      return update(state, {
        isLoading: {$set: true}
      });

    case GET_CURRENT_SUCCESS:
      return update(state, {
        isLoading: {$set: false},
        current: {$set: action.payload.user}
      });

    case GET_CURRENT_ERROR:
      return update(state, {
        isLoading: {$set: false}
      });
    default: {
      return state;
    }

  }
};

export default user;
