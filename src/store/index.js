// import parserMiddleware from 'redux-schema-middleware';

import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { browserHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import apiMiddleware from './api';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState) => {
  const enhancer = composeEnhancers(
    applyMiddleware(
      apiMiddleware,
      // parserMiddleware,
      thunkMiddleware,
      // routerMiddleware(browserHistory)
    )
  );

  return createStore(reducers, initialState, enhancer);
};
