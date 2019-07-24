import update from 'react-addons-update';

export const UPDATE_JOURNEY = 'JCreateView_UPDATE';

export const updateBody = body => ({
  type: UPDATE_JOURNEY,
  body
});


export const actions = {
  updateBody
};

const defaultState = {
  point: null,
  description: null
};

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_JOURNEY:
      return update(state, {
        $merge: action.body
      });

    default:
      return state;
  }
};

export default reducers;