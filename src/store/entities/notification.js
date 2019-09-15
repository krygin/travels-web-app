import conf from 'shared/config';
import {CALL_API} from 'store/api';
import update from 'react-addons-update';


export const GET_NOTIFICATION_LIST = 'GET_NOTIFICATION_LIST';
export const GET_NOTIFICATION_LIST_SUCCESS = 'GET_NOTIFICATION_LIST_SUCCESS';
export const GET_NOTIFICATION_LIST_FAILURE = 'GET_NOTIFICATION_LIST_FAILURE';

const getNotificationList = (showLoader) => ({
  [CALL_API]: {
    endpoint: conf.getNotificationList,
    types: [
      GET_NOTIFICATION_LIST,
      GET_NOTIFICATION_LIST_SUCCESS,
      GET_NOTIFICATION_LIST_FAILURE
    ],
    additionalData: {
      showLoader: !!showLoader
    }
  }
});

export const actions = {
  getNotificationList,
};

const defaultState = {
  isLoading: false,
  notificationIds: [],
  notifications: {}
};

export const notification = (state = defaultState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_LIST:
      return update(state, {
        isLoading: {$set: action.additionalData.showLoader}
      });

    case GET_NOTIFICATION_LIST_SUCCESS:
      const payload = action.payload;
      let notifications = {};
      const notificationIds = payload.map(item => {
        notifications[item.id] = item;
        return item.id;
      });
      return update(state, {
        isLoading: {$set: false},
        notificationIds: {$set: notificationIds},
        notifications: {$merge: notifications}
      });

    case GET_NOTIFICATION_LIST_FAILURE:
      return update(state, {
        isLoading: {$set: false}
      });

    default: {
      return state;
    }

  }
};

export default notification;
