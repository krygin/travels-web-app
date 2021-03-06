import update from 'react-addons-update';

export const UPDATE_JOURNEY = 'JCreateView_UPDATE';

export const updateBody = body => ({
  type: UPDATE_JOURNEY,
  body
});


export const actions = {
  updateBody
};

export const defaultState = {
  id: 0,
  point: null,
  dates: null,
  description: ''
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