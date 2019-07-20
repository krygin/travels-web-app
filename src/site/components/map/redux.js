import update from 'react-addons-update';

export const SET_POINT = 'MAP_SET_POINT';
export const SET_POINT_LIST = 'MAP_SET_POINT_LIST';

export const setPoint = point => ({
  type: SET_POINT,
  point
});

export const setPointList = points => ({
  type: SET_POINT_LIST,
  points
});

export const mapActions = {
  setPoint,
  setPointList
};

const defaultState = {
  points: [],
  center: {lat: 33.4317826, lng: 18.0429884}
};

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case SET_POINT:
      return update(state, {
        points: {$set: [action.point]},
        center: {$set: action.point.location}
      });

    case SET_POINT_LIST:
      return update(state, {
        points: {$set: action.points}
      });

    default:
      return state;
  }
};

export default reducers;