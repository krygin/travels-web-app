import conf from 'shared/config';
import { CALL_API } from 'store/api';

export const CREATE_POSITION = 'CREATE_POSITION';
export const CREATE_POSITION_SUCCESS = 'CREATE_POSITION_SUCCESS';
export const CREATE_POSITION_ERROR = 'CREATE_POSITION_ERROR';

export const createPosition = (point, placeId, description) => ({
  [CALL_API]: {
    endpoint: conf.geoPositionCreate,
    method: 'POST',
    body: {
      place_id: placeId,
      point,
      description
    },
    types: [CREATE_POSITION, CREATE_POSITION_SUCCESS, CREATE_POSITION_ERROR]
  }
});

export const actions = {
  createPosition
};
