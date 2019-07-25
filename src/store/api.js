import conf from 'shared/config';
import axios from 'axios';


export function callApi(endpoint, methodType, body, config) {
  const method = methodType.toLowerCase();
  endpoint = `${conf.root}${endpoint}`;
  return axios[method](endpoint, body, config)
    .then(
      (response) => {
        if (response.status !== 200) {
          return Promise.reject(response);
        }

        return response.data || response;
      },
      error => Promise.reject(error)
    );
}


export const CALL_API = Symbol('Call API');


export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let {endpoint, method} = callAPI;
  const {types, body, config, additionalData, schema} = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!(method in {GET: 1, POST: 1})) {
    method = 'GET';
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({type: requestType, additionalData}));

  return callApi(endpoint, method, body, config).then(
    response => next(actionWith({
      payload: response.data || response,
      type: successType,
      additionalData,
      schema
    })),
    error => next(actionWith({
      type: failureType,
      error,
      additionalData
    }))
  );
};
